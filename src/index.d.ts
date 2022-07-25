import { Handler } from 'express';

export function routerBranch(routers: Map<string, Handler[]> , options ?: Record<string, string>): Handler;
