import {
    AppBar,
    FormControl,
    Grid,
    makeStyles,
    Slider,
    Toolbar,
    Typography,
    withStyles,
    InputLabel,
    NativeSelect,
    InputBase,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {useState} from "react";
import {useContext} from "react";
import {CartContext} from "../../Context/CartContextWrapper";
import "./Header.css";
import LocalMallIcon from '@material-ui/icons/LocalMall';

function valuetext(value) {
    return `${value}`;
}

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}))(Badge);

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
            marginBottom: 25,
        },
    },
    input: {
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        marginBottom: 25,
    },

    title: {
        flexGrow: 1,
    },
}));

const Header = ({categories, handlerFilter}) => {
    const [list] = useContext(CartContext);
    const [filterName, setFilterName] = useState("");
    const [sliderValue, setSliderValue] = useState([1, 100]);

    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setSliderValue(newValue);
        handlerFilter(filterName, sliderValue);
    };

    const handleChangeFilterName = (filterName) => {
        setFilterName(filterName);
        handlerFilter(filterName, sliderValue);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="h6" className={classes.title}>
                            Alex Shop
                        </Typography>
                        <StyledBadge badgeContent={list.length} color="secondary">
                            <LocalMallIcon fontSize={"large"}/>
                        </StyledBadge>
                    </Toolbar>
                </AppBar>
            </div>

            <div>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="demo-customized-select-native">
                                Categories
                            </InputLabel>
                            <NativeSelect
                                input={<BootstrapInput/>}
                                onChange={(e) => handleChangeFilterName(e.target.value)}
                            >
                                {categories.map((categorie) => (
                                    <option key={categorie} value={categorie}>
                                        {categorie}
                                    </option>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <Grid container justifyContent="space-between">
                            <Typography>{sliderValue[0]}</Typography>
                            <Typography>{sliderValue[1]}</Typography>
                        </Grid>
                        <Slider
                            value={sliderValue}
                            onChange={handleChange}
                            marks
                            step={10}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Header;
