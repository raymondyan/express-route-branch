import {RouterBranch} from "../src";
import {Handler, Request, Response} from "express";

describe('Test express branch', () => {
    it('should success', () => {
        let middlewareStep = jest.fn();
        let routerBranch = new RouterBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]));
        routerBranch.path('BranchA')({} as Request, {} as Response, jest.fn());
        expect(middlewareStep).toBeCalledTimes(1);
    });

    it('should fail', () => {
        let middlewareStep = jest.fn();
        let routerBranch = new RouterBranch(new Map<string, Handler[]>([['BranchA', [middlewareStep]]]));
        expect(() => routerBranch.path('BranchB')).toThrow('Branch is not exist!');
    });
})