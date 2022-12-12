import { createTheme, Color, colors } from "@mui/material";

const theme = createTheme({
    palette: {
        grey: colors.lightBlue
    }
    /*
    palette: {
        primary: {
            main: "#f57c00",
            light: "#ffa726",
            dark: "#ebedf0",
            contrastText: "rgba(0, 0, 0, 0.87)"
        }
    }
    */
});

export default theme;