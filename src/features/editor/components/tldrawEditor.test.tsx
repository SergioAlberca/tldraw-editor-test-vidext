import { render, screen } from "@testing-library/react";
import TldrawEditor from "./tldrawEditor";

jest.mock("@/features/editor/hooks/useEditor", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useEditor from "@/features/editor/hooks/useEditor";

describe("TldrawEditor", () => {
  const mockSetEditor = jest.fn();
  const mockRandomizeShape = jest.fn();
  const mockResetBoard = jest.fn();
  const mockHideWarning = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly and passes props", () => {
    (useEditor as jest.Mock).mockReturnValue({
      setEditor: mockSetEditor,
      randomizeShape: mockRandomizeShape,
      resetBoard: mockResetBoard,
      isShowingWarning: false,
      hideWarning: mockHideWarning,
    });

    render(<TldrawEditor />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows InfoDialog when isShowingWarning is true", () => {
    (useEditor as jest.Mock).mockReturnValue({
      setEditor: mockSetEditor,
      randomizeShape: mockRandomizeShape,
      resetBoard: mockResetBoard,
      isShowingWarning: true,
      hideWarning: mockHideWarning,
    });

    render(<TldrawEditor />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
