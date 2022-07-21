import {Handler, NextFunction, Request, Response} from 'express';

export class RouterBranch {
    routers: Map<string, Handler[]>;

    constructor(routers: Map<string, Handler[]>) {
        this.routers = routers;
    }

    path = (branch: string) => {
        this.validate(branch);
        const steps = [...(this.routers.get(branch) || [])];
        return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
            await steps.reverse().reduce((handlers: NextFunction, step: Handler) => {
                const nextStep = handlers;
                return async (err?: any) => {
                    err && next(err);
                    await step(req, res, nextStep)
                };
            }, next)(req, res, next);
        };
    }

    private validate(branch: string) {
        if (!this.routers.has(branch)) {
            throw Error;
        }
    }
}




