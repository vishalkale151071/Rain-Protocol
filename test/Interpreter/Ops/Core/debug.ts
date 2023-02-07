import { assert } from "chai";
import { concat } from "ethers/lib/utils";
import { iinterpreterV1ConsumerDeploy } from "../../../../utils/deploy/test/iinterpreterV1Consumer/deploy";
import {
  callOperand,
  Debug,
  doWhileOperand,
  loopNOperand,
  memoryOperand,
  MemoryType,
  op,
} from "../../../../utils/interpreter/interpreter";
import { AllStandardOps } from "../../../../utils/interpreter/ops/allStandardOps";

const Opcode = AllStandardOps;

describe("RainInterpreter debug op", async function () {
  it("should log stack when DEBUG operand is set to DEBUG_STACK", async () => {
    const constants = [10, 20];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1)),
      op(Opcode.add, 2),
      op(Opcode.debug, Debug.Stack),
    ])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    assert(true); // you have to check this log yourself
  });

  it("should log packed state when DEBUG operand is set to DEBUG_STATE_PACKED", async () => {
    const constants = [10, 20];

    // prettier-ignore
    const sources = [concat([
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1)),
      op(Opcode.add, 2),
      op(Opcode.debug, Debug.StatePacked),
    ])];

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources,
          constants,
        },
        1
      );

    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );

    assert(true); // you have to check this log yourself
  });

  it("should be able to log when used within a source from CALL op", async () => {
    const constants = [0, 1, 20];

    // prettier-ignore
    const checkValue = concat([
      op(Opcode.debug, Debug.Stack), // Should show the new stack
        op(Opcode.readMemory, memoryOperand(MemoryType.Stack, 0)),
        op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 2)),
      op(Opcode.lessThan),
    ]);

    // prettier-ignore
    const source = concat([
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1)),
      op(Opcode.debug, Debug.Stack), // Should show the stack here
      op(Opcode.call, callOperand(1, 1, 1)),
      op(Opcode.debug, Debug.Stack), // Should show the stack here
    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [source, checkValue],
          constants,
        },
        1
      );

    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );
  });

  it("should be able to log when used within a source from DO_WHILE op", async () => {
    const constants = [3, 2, 7];

    // prettier-ignore
    const sourceMAIN = concat([
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0)),
          op(Opcode.readMemory, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 2)),
        op(Opcode.lessThan),
      op(Opcode.doWhile, doWhileOperand(1, 0, 1)), // Source to run is on index 1
    ]);

    // prettier-ignore
    const sourceWHILE = concat([
        op(Opcode.readMemory, memoryOperand(MemoryType.Stack, 0)),
        op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1)),
      op(Opcode.add, 2),
        op(Opcode.readMemory, memoryOperand(MemoryType.Stack, 1)),
        op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 2)),
      op(Opcode.lessThan),
      op(Opcode.debug, Debug.Stack),
    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [sourceMAIN, sourceWHILE],
          constants,
        },
        1
      );

    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );
  });

  it("should be able to log when used within a source from LOOP_N op", async () => {
    const n = 5;
    const initialValue = 2;
    const incrementValue = 1;

    const constants = [initialValue, incrementValue];

    // prettier-ignore
    const sourceADD = concat([
          op(Opcode.readMemory, memoryOperand(MemoryType.Stack, 0)),
          op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 1)),
        op(Opcode.add, 2),
        op(Opcode.debug, Debug.Stack),
      ]);

    // prettier-ignore
    const sourceMAIN = concat([
      op(Opcode.readMemory, memoryOperand(MemoryType.Constant, 0)),
      op(Opcode.loopN, loopNOperand(n, 1, 1, 1))
    ]);

    const { consumerLogic, interpreter, dispatch } =
      await iinterpreterV1ConsumerDeploy(
        {
          sources: [sourceMAIN, sourceADD],
          constants,
        },
        1
      );

    let expectedResult = initialValue;
    for (let i = 0; i < n; i++) {
      expectedResult += incrementValue;
    }

    await consumerLogic["eval(address,uint256,uint256[][])"](
      interpreter.address,
      dispatch,
      []
    );
    const result0 = await consumerLogic.stackTop();
    assert(
      result0.eq(expectedResult),
      `Invalid output, expected ${expectedResult}, actual ${result0}`
    );
  });
});
