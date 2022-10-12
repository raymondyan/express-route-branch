import {Handler, Request, Response} from "express";
import {routerBranch} from "../dist";

describe('Test express branch', () => {
    it('should success', async () => {
        let middlewareStep = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]))({body: {branch: 'BranchA'}} as Request, {} as Response, jest.fn());
        expect(middlewareStep).toBeCalledTimes(1);
    });

    it('should success with different branch field', async () => {
        let middlewareStep = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]), {field: 'test'})({body: {test: 'BranchA'}} as Request, {} as Response, jest.fn());
        expect(middlewareStep).toBeCalledTimes(1);
    });

    it('should success with default', async () => {
        let middlewareStep = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]), {defaultBranch: 'BranchA'})({} as Request, {} as Response, jest.fn());
        expect(middlewareStep).toBeCalledTimes(1);
    });

    it('should fail when branch is not in the map', async () => {
        let middlewareStep = jest.fn();
        let next = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]))({body: {branch: 'BranchB'}} as Request, {} as Response, next);
        expect(next).toBeCalledWith(new Error('Branch is not exist in map!'));
    });

    it('should fail when branch is not provided', async () => {
        let middlewareStep = jest.fn();
        let next = jest.fn();
        await routerBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]))({body: {}} as Request, {} as Response, next);
        expect(next).toBeCalledWith(new Error('Must provide branch in request body or provide a default value'));
    });
})