import {Handler, NextFunction, Request, Response} from 'express';
import {Options} from "./types/Options";

export class RouterBranch {
    static routerBranch(routers: Map<string, Handler[]>, options ?: Options) {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            const branchField = options?.field || "branch"
            let branch = req?.body && req?.body[branchField];
            branch = branch || options?.defaultBranch;
            if (!branch) {
                next(new Error('Must provide branch in request body or provide a default value'));
                return;
            }
            if (!routers.has(branch)) {
                next(new Error('Branch is not exist in map!'));
                return;
            }
            const steps = [...(routers.get(branch) || [])];
            await steps.reverse().reduce((handlers: NextFunction, step: Handler) => {
                const nextStep = handlers;
                return async (err?: any) => {
                    err && next(err);
                    await step(req, res, nextStep)
                };
            }, next)();
        };
    }
}

module.exports = RouterBranch;

