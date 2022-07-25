import {Handler, Request, Response} from "express";
import {routerBranch} from "../dist";

describe('Test express branch', () => {
    it('should success', async () => {
        let middlewareStep = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]))({body: {branch: 'BranchA'}} as Request, {} as Response, jest.fn());
        expect(middlewareStep).toBeCalledTimes(1);
    });

    it('should fail', async () => {
        let middlewareStep = jest.fn();
        let next = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]))({body: {branch: 'BranchB'}} as Request, {} as Response, next);
        expect(next).toBeCalledWith(new Error('Branch is not exist!'));
    });
})