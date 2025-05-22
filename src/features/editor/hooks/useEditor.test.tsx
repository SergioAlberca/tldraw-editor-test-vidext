import { renderHook, act } from "@testing-library/react";
import useEditor from "./useEditor";
import { trpc } from "@/lib/trcp/client";

const mockCreateShape = jest.fn();
const mockUpdateShape = jest.fn();
const mockGetSnapshot = jest.fn();
const mockLoadSnapshot = jest.fn();
const mockSaveDocument = jest.fn();
const mockDeleteShapes = jest.fn();

jest.mock("@/lib/trcp/client", () => ({
  trpc: {
    shape: {
      getDocument: {
        useQuery: jest.fn(),
      },
      saveDocument: {
        useMutation: jest.fn(),
      },
    },
  },
}));

describe("useEditor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    (trpc.shape.getDocument.useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });
    (trpc.shape.saveDocument.useMutation as jest.Mock).mockReturnValue({
      mutate: mockSaveDocument,
    });
  });

  it("should create initial shape if no data on load", () => {
    const { result } = renderHook(() => useEditor());

    const editor = {
      createShape: mockCreateShape,
      loadSnapshot: mockLoadSnapshot,
    };

    act(() => {
      result.current.setEditor(editor as any);
    });

    expect(mockCreateShape).toHaveBeenCalledWith({
      type: "geo",
      x: 100,
      y: 100,
      props: { geo: "rectangle", w: 150, h: 150 },
    });
  });

  it("should randomize selected shape and save document", () => {
    const shape = { id: "1", props: { someProp: "value" } };
    const editor = {
      getSelectedShapeIds: () => ["1"],
      getShape: () => shape,
      updateShape: mockUpdateShape,
      getSnapshot: mockGetSnapshot,
      createShape: mockGetSnapshot,
    };

    (mockGetSnapshot as jest.Mock).mockReturnValue("snapshot");

    const { result } = renderHook(() => useEditor());

    act(() => {
      result.current.setEditor(editor as any);
    });

    act(() => {
      result.current.randomizeShape();
    });

    expect(mockUpdateShape).toHaveBeenCalledWith({
      ...shape,
      props: expect.any(Object),
    });
    expect(mockSaveDocument).toHaveBeenCalledWith("snapshot");
    expect(result.current.isShowingWarning).toBe(false);
  });

  it("should reset the board properly", () => {
    const editor = {
      getCurrentPageShapeIds: () => ["s1", "s2"],
      deleteShapes: mockDeleteShapes,
      createShape: mockCreateShape,
      getSnapshot: mockGetSnapshot,
    };

    (mockGetSnapshot as jest.Mock).mockReturnValue("snapshot");

    const { result } = renderHook(() => useEditor());

    act(() => {
      result.current.setEditor(editor as any);
    });

    act(() => {
      result.current.resetBoard();
    });

    expect(mockDeleteShapes).toHaveBeenCalledWith(["s1", "s2"]);
    expect(mockCreateShape).toHaveBeenCalled();
    expect(mockSaveDocument).toHaveBeenCalledWith("snapshot");
  });
});
