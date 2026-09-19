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
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;
const isUtcIsoTimestamp = (value) =>
  typeof value === 'string' &&
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value) &&
  Number.isFinite(Date.parse(value)) &&
  (() => {
    const canonical = new Date(value).toISOString();
    return canonical === value || canonical.replace(/\.000Z$/u, 'Z') === value;
  })();

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
    'findingsCount',
    'acceptedCount',
    'rejectedCount',
    'delegateUsed',
    'timestamp',
  ];
  if (required.some((key) => !(key in payload))) {
    throw new Error('telemetry payload is missing a required field');
  }
  const pr = 'pr' in payload ? payload.pr : null;

  if (
    payload.phase !== 'C' ||
    !isNonNegativeInteger(payload.round) ||
    typeof payload.repo !== 'string' ||
    !isPositiveInteger(payload.issue) ||
    (pr !== null && !isPositiveInteger(pr)) ||
    !isNonNegativeInteger(payload.findingsCount) ||
    !isNonNegativeInteger(payload.acceptedCount) ||
    !isNonNegativeInteger(payload.rejectedCount) ||
    typeof payload.delegateUsed !== 'boolean' ||
    !isUtcIsoTimestamp(payload.timestamp)
  ) {
    throw new Error('telemetry payload has an invalid field');
  }

  const severity =
    'severityBreakdown' in payload ? payload.severityBreakdown : undefined;
  const normalizedSeverity = {
    high: severity?.high ?? 0,
    medium: severity?.medium ?? 0,
    low: severity?.low ?? 0,
  };
  if (
    (severity === undefined
      ? payload.findingsCount !== 0
      : severity === null ||
        typeof severity !== 'object' ||
        Array.isArray(severity)) ||
    !isNonNegativeInteger(normalizedSeverity.high) ||
    !isNonNegativeInteger(normalizedSeverity.medium) ||
    !isNonNegativeInteger(normalizedSeverity.low)
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

  if (payload.acceptedCount + payload.rejectedCount !== payload.findingsCount) {
    throw new Error('acceptedCount + rejectedCount must equal findingsCount');
  }

  // Match upstream harvesting: a severity breakdown may be partial, but it
  // must never claim more findings than the round contains.
  if (
    normalizedSeverity.high +
      normalizedSeverity.medium +
      normalizedSeverity.low >
    payload.findingsCount
  ) {
    throw new Error('severityBreakdown total must not exceed findingsCount');
  }

  const normalized = {
    phase: payload.phase,
    round: payload.round,
    repo: payload.repo,
    issue: payload.issue,
    pr,
    findingsCount: payload.findingsCount,
    severityBreakdown: normalizedSeverity,
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
