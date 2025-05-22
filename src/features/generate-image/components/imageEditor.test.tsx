import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageEditor from "./imageEditor";

jest.mock("../hooks/useGenerateImage");

import useGenerateImage from "../hooks/useGenerateImage";

describe("ImageEditor", () => {
  const mockSetPrompt = jest.fn();
  const mockHandleGenerateImage = jest.fn();
  const mockSetEditor = jest.fn();
  const mockHideError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGenerateImage as jest.Mock).mockReturnValue({
      prompt: "test prompt",
      setPrompt: mockSetPrompt,
      handleGenerateImage: mockHandleGenerateImage,
      setEditor: mockSetEditor,
      isLoading: false,
      showError: false,
      hideError: mockHideError,
    });
  });

  it("renders correctly with initial state", () => {
    render(<ImageEditor />);

    const input = screen.getByDisplayValue("test prompt");

    expect(input).toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("calls setPrompt when input changes", () => {
    render(<ImageEditor />);

    const input = screen.getByDisplayValue("test prompt");

    fireEvent.change(input, { target: { value: "nuevo prompt" } });

    expect(mockSetPrompt).toHaveBeenCalledWith("nuevo prompt");
  });

  it("calls handleGenerateImage when generate button clicked", () => {
    render(<ImageEditor />);

    const button = screen.getByRole("button", { name: /generar/i });
    fireEvent.click(button);

    expect(mockHandleGenerateImage).toHaveBeenCalled();
  });

  it("shows error dialog when showError is true", () => {
    (useGenerateImage as jest.Mock).mockReturnValueOnce({
      prompt: "test prompt",
      setPrompt: mockSetPrompt,
      handleGenerateImage: mockHandleGenerateImage,
      setEditor: mockSetEditor,
      isLoading: false,
      showError: true,
      hideError: mockHideError,
    });

    render(<ImageEditor />);

    expect(screen.getByText(/error/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(mockHideError).toHaveBeenCalled();
  });
});
