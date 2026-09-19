#!/usr/bin/env node

import { appendFile, mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const readStdin = async () => {
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  return input;
};

const isNonNegativeInteger = (value) => Number.isInteger(value) && value >= 0;

const normalizePayload = (payload) => {
  if (
    payload === null ||
    typeof payload !== 'object' ||
    Array.isArray(payload)
  ) {
    throw new Error('telemetry payload must be an object');
  }

  const required = [
    'phase',
    'round',
    'repo',
    'issue',
    'pr',
    'findingsCount',
    'severityBreakdown',
    'acceptedCount',
    'rejectedCount',
    'delegateUsed',
    'timestamp',
  ];
  if (required.some((key) => !(key in payload))) {
    throw new Error('telemetry payload is missing a required field');
  }
  if (
    payload.phase !== 'C' ||
    !isNonNegativeInteger(payload.round) ||
    typeof payload.repo !== 'string' ||
    !isNonNegativeInteger(payload.issue) ||
    (payload.pr !== null && !isNonNegativeInteger(payload.pr)) ||
    !isNonNegativeInteger(payload.findingsCount) ||
    !isNonNegativeInteger(payload.acceptedCount) ||
    !isNonNegativeInteger(payload.rejectedCount) ||
    typeof payload.delegateUsed !== 'boolean' ||
    typeof payload.timestamp !== 'string'
  ) {
    throw new Error('telemetry payload has an invalid field');
  }

  const severity = payload.severityBreakdown;
  if (
    severity === null ||
    typeof severity !== 'object' ||
    Array.isArray(severity) ||
    !isNonNegativeInteger(severity.high) ||
    !isNonNegativeInteger(severity.medium) ||
    !isNonNegativeInteger(severity.low)
  ) {
    throw new Error('telemetry severity breakdown is invalid');
  }

  if (
    payload.delegateUsed &&
    (typeof payload.delegateCommand !== 'string' ||
      payload.delegateCommand.length === 0)
  ) {
    throw new Error('telemetry delegate command is required');
  }

  const normalized = {
    phase: payload.phase,
    round: payload.round,
    repo: payload.repo,
    issue: payload.issue,
    pr: payload.pr,
    findingsCount: payload.findingsCount,
    severityBreakdown: {
      high: severity.high,
      medium: severity.medium,
      low: severity.low,
    },
    acceptedCount: payload.acceptedCount,
    rejectedCount: payload.rejectedCount,
    delegateUsed: payload.delegateUsed,
    timestamp: payload.timestamp,
  };
  if (payload.delegateUsed) {
    normalized.delegateCommand = payload.delegateCommand;
  }
  return normalized;
};

const main = async () => {
  const payload = normalizePayload(JSON.parse(await readStdin()));
  const stateRoot =
    process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local', 'state');
  const logDirectory = path.join(stateRoot, 'idd-critique');
  await mkdir(logDirectory, { recursive: true });
  await appendFile(
    path.join(logDirectory, 'log.jsonl'),
    `${JSON.stringify(payload)}\n`,
    'utf8',
  );
};

main().catch(() => {
  process.exitCode = 1;
});
