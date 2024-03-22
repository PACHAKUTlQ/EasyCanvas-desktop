package main

/*
#cgo LDFLAGS: -luser32
#include <windows.h>
void HideTitleBar();
void UnminimizeLoop();
*/
import "C"
import (
	"context"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "EasyCanvas",
		Width:  370,
		Height: 500,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		// Frameless:        true, // Must not set to true, or the window will not be transparent
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
		OnDomReady: func(ctx context.Context) {
			C.HideTitleBar()
			C.UnminimizeLoop()
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              true,
			WindowIsTranslucent:               true,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			Theme:                             windows.SystemDefault,
		},
	})

	if err != nil {
		println("Error: ", err.Error())
	}
}
