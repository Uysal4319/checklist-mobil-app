import { Dimensions, Platform } from "react-native";


const { width, height } = Dimensions.get("window");

const screen = {
  width,
  height
};

const SCREEN_MARGIN = 15;

const activeFonts = {
  tisa: {
    bold: "TisaPro-Bold",
    medium: "TisaPro-Medium",
    regular: "TisaPro-Regular"
  },
  proxima: {
    black: "ProximaNova-Black",
    bold: "ProximaNova-Bold",
    extaBold: "ProximaNova-Extrabld",
    light: "ProximaNova-Light",
    regular: "ProximaNova-Regular",
    medium: "ProximaNova-Semibold",
    thin: "ProximaNovaT-Thin"
  }
};

const fonts = {
  rto: activeFonts.proxima,
  read: activeFonts.tisa
};

const colors = {
  darkerWhite: "#F1F1F1",
  statusBarColor: "white",
  tabColorBlack: "#505050",
  tabColorGray: "#C7C7C7",

  lineGray: "#DEDEDE",
  darkishBlack: "#484342",
  lightishBlack: "#767E8A",
  subtitleGray: "#797979",
  borderGray: "#E8E8E8",
  facebookBgColor: "#3B5998",
  royalBlue: "#3969F1",
  headBlue: "#0175FF",
  pureRed: "#FF0000",
  errorRed: "#FB4C7A",
  heartRed: "#D45755",
  exitRed: "#E91616",
  dark: "#141419",
  darkRead: "#3b464b",
  darkerDarkRead: "#2C3032",
  darkReadContext: "#393d3e",
  searchTextGray: "#B1BCCB",
  explanationBrown: "#7D7371",
  settingsBg: "#faf9f9",
  dividerLight: "#F0F0F0",
  dividerDark: "#eeeeee",
  green: "#2DDD6D",
  lightGreen: "#2AC062",
  grayInfo: "#8E8785",
  backgroundGray: "#F2F2F2",
  listSubtitleGray: "#B3B3B3",
  darkBlue: "#0032a1",
  textInputPlaceholderGray: '#969696',
  pastelYellow: '#ffd834',
  turkuaz: '#66d8ea',
  sunYellow: '#ffd834',
  dustyOrange: '#ff8534',
  uglyBlue:'#297f91',
  peach:'#ffae78',
  backgroundColor: '#E5E5E5',
  black: 'rgb(0,0,0)',
  blackTwo: 'rgb(56,56,56)',
  white: 'rgb(255,255,255)',
  placeholder: '#ECECEC',
  gray: '#f6f9fc',
  brownishOrange: 'rgb(210,137,40)',
  lightBrownishOrange: 'rgba(210,137,40,0.55)',
  denimBlue: 'rgb(57,81,133)',
  darkCoral: 'rgb(213,75,61)',
  brownGrey: 'rgb(152,152,152)',
  lightPeach30: 'rgba(218,215,211,0.3)',
  lightPeach: 'rgb(217,216,216)',
  sandy: 'rgb(230,190,133)',
  pinkishGrey: 'rgb(190,185,185)',
  buttonLightGradient: ['rgba(81, 126, 131, 0.5)', 'rgba(43, 66, 69, 0.5)'],
  buttonDarkGradient: ['rgba(81, 126, 131, 0.9)', 'rgba(43, 66, 69, 1)'],
  signUpLogoBackground: ['rgba(81, 126, 131, 0.9)', 'rgba(0,0,0, 0.9)'],
  solid: '#515050',
  transparent: 'rgba(52, 52, 52, 0.8)',
};

const device = {
  isIOS: Platform.OS === "ios",
  os: Platform.OS
};

export { screen, fonts, colors, device, SCREEN_MARGIN };
