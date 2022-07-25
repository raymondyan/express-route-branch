import {Handler, NextFunction, Request, Response} from 'express';

export class RouterBranch {
    static routerBranch(routers: Map<string, Handler[]>, options ?: Record<string, string>) {
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            let { branch } = req.body;
            if (options && options.default) {
               branch = branch || options.default;
            }
            if (!routers.has(branch)) {
                next(new Error('Branch is not exist!'));
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

