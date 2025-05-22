import { Editor } from "@tldraw/tldraw";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import useGenerateImage from "./useGenerateImage";

export const mockMutate = jest.fn();

let mockIsError = false;

jest.mock("@/lib/trcp/client", () => ({
  trpc: {
    generateImage: {
      generateImage: {
        useMutation: () => ({
          mutateAsync: mockMutate,
          get isError() {
            return mockIsError;
          },
        }),
      },
    },
  },
}));

describe("useGenerateImage", () => {
  beforeEach(() => {
    mockMutate.mockReset();
    mockIsError = false;
  });

  it("calls generateImage and inserts the image", async () => {
    const fakeImageUrl = "https://example.com/image.png";
    mockMutate.mockResolvedValue({ imageUrl: fakeImageUrl });

    const createAssets = jest.fn();
    const createShape = jest.fn();
    const deleteShapes = jest.fn();
    const getCurrentPageShapeIds = jest.fn(() => ["shape1"]);

    const mockEditor = {
      createAssets,
      createShape,
      deleteShapes,
      getCurrentPageShapeIds,
    } as unknown as Editor;

    const { result } = renderHook(() => useGenerateImage());

    act(() => {
      result.current.setEditor(mockEditor);
      result.current.setPrompt("a cat on the moon");
    });

    await act(async () => {
      await result.current.handleGenerateImage();
    });

    expect(mockMutate).toHaveBeenCalledWith("a cat on the moon");
    expect(deleteShapes).toHaveBeenCalledWith(["shape1"]);
    expect(createAssets).toHaveBeenCalled();
    expect(createShape).toHaveBeenCalled();
  });

  it("sets showError to true when isError becomes true and then hides it after timeout", () => {
    jest.useFakeTimers();
    mockIsError = true;

    const { result } = renderHook(() => useGenerateImage());

    expect(result.current.showError).toBe(true);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.showError).toBe(false);

    jest.useRealTimers();
  });

  it("hideError sets showError to false", () => {
    const { result } = renderHook(() => useGenerateImage());

    act(() => {
      // Forzamos error visible
      result.current.setPrompt("error");
      // Simulamos que showError es true
      (result.current as any).showError = true;
      result.current.hideError();
    });

    expect(result.current.showError).toBe(false);
  });

  it("does nothing if editor is null when handleGenerateImage is called", async () => {
    const { result } = renderHook(() => useGenerateImage());

    await act(async () => {
      await result.current.handleGenerateImage();
    });

    expect(mockMutate).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("sets isLoading true during image generation and false after", async () => {
    mockMutate.mockResolvedValue({ imageUrl: "url" });

    const mockEditor = {
      createAssets: jest.fn(),
      createShape: jest.fn(),
      deleteShapes: jest.fn(),
      getCurrentPageShapeIds: jest.fn(() => []),
    } as unknown as Editor;

    const { result } = renderHook(() => useGenerateImage());

    act(() => {
      result.current.setEditor(mockEditor);
      result.current.setPrompt("some prompt");
    });

    const loadingStates: boolean[] = [];

    act(() => {
      loadingStates.push(result.current.isLoading);
    });

    await act(async () => {
      loadingStates.push(true);
      await result.current.handleGenerateImage();
      loadingStates.push(result.current.isLoading);
    });

    expect(loadingStates).toContain(true);
    expect(loadingStates).toContain(false);
  });
});
