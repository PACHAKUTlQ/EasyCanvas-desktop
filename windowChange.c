#include <windows.h>

HWND hWnd = NULL;

void HideTitleBar() {
	if (!hWnd) {
		hWnd = FindWindow(NULL, "EasyCanvas");
	}
	// Retrieve the current window style.
	LONG_PTR style = GetWindowLongPtr(hWnd, GWL_STYLE);

	// Remove WS_CAPTION style to hide the title bar.
	style &= ~(WS_CAPTION);

	// Apply the new style.
	SetWindowLongPtr(hWnd, GWL_STYLE, style);

	// Set the window position and size to force the change to take effect.
	SetWindowPos(hWnd, NULL, 0, 0, 0, 0,
	             SWP_FRAMECHANGED | SWP_NOMOVE | SWP_NOSIZE | SWP_NOZORDER | SWP_NOOWNERZORDER);
}

void UnminimizeLoop() {
	WINDOWPLACEMENT wp;
	wp.length = sizeof(WINDOWPLACEMENT);
	if (!hWnd) {
		hWnd = FindWindow(NULL, "EasyCanvas");
	}

	while (1) {
		Sleep(100);
		if (!IsZoomed(hWnd)) {
			GetWindowPlacement(hWnd, &wp);
			wp.showCmd = SW_SHOWNOACTIVATE;
			SetWindowPlacement(hWnd, &wp);
		}
		Sleep(100);
	}
}
