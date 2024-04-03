import accuweatherIcon from "../assets/app_icons/accuweather.webp";
import allrecipesIcon from "../assets/app_icons/allrecipes.webp";
import amazonMusicIcon from "../assets/app_icons/amazon_music.webp";
import amazonShoppingIcon from "../assets/app_icons/amazon_shopping.webp";
import amcrestSmartHomeIcon from "../assets/app_icons/amcrest_smart_home.webp";
import appleMusicIcon from "../assets/app_icons/apple_music.webp";
import bmwIcon from "../assets/app_icons/bmw.webp";
import bondIcon from "../assets/app_icons/bond.webp";
import bringIcon from "../assets/app_icons/bring.webp";
import calculatorIcon from "../assets/app_icons/calculator.webp";
import chatgptIcon from "../assets/app_icons/chatgpt.webp";
import chromeIcon from "../assets/app_icons/chrome.webp";
import clockTimerIcon from "../assets/app_icons/clock.webp";
import doordashIcon from "../assets/app_icons/doordash.webp";
import eufySecurityIcon from "../assets/app_icons/eufy_security.webp";
import grubhubIcon from "../assets/app_icons/grubhub.webp";
import homeConnectIcon from "../assets/app_icons/home_connect.webp";
import hueIcon from "../assets/app_icons/hue.webp";
import huluIcon from "../assets/app_icons/hulu.webp";
import irobotIcon from "../assets/app_icons/irobot.webp";
import keurigIcon from "../assets/app_icons/keurig.webp";
import lionchiefIcon from "../assets/app_icons/lionel_chief.webp";
import lutronIcon from "../assets/app_icons/lutron.webp";
import myqIcon from "../assets/app_icons/myq.webp";
import nestIcon from "../assets/app_icons/nest.webp";
import netflixIcon from "../assets/app_icons/netflix.webp";
import pandoraIcon from "../assets/app_icons/pandora.webp";
import playStoreIcon from "../assets/app_icons/play_store.webp";
import rachioIcon from "../assets/app_icons/rachio.webp";
import rainbirdIcon from "../assets/app_icons/rainbird.webp";
import ringIcon from "../assets/app_icons/ring.webp";
import rokuIcon from "../assets/app_icons/roku.webp";
import senseIcon from "../assets/app_icons/sense.webp";
import shazamIcon from "../assets/app_icons/shazam.webp";
import shiptShopperIcon from "../assets/app_icons/shipt_shopper.webp";
import sleepNumberIcon from "../assets/app_icons/sleep_number.webp";
import solitaireIcon from "../assets/app_icons/solitaire.webp";
import sonosIcon from "../assets/app_icons/sonos.webp";
import spotifyIcon from "../assets/app_icons/spotify.webp";
import tuyaSmartIcon from "../assets/app_icons/tuya_smart.webp";
import uberEatsIcon from "../assets/app_icons/uber_eats.webp";
import weatherChannelIcon from "../assets/app_icons/weather_channel.webp";
import weatherUndergroundIcon from "../assets/app_icons/weather_underground.webp";
import yummlyIcon from "../assets/app_icons/yummly.webp";

interface AppTable {
  [key: string]: {
    name: string;
    app_icon: string;
    launcher: "package" | "uri_scheme";
    package: string;
    uri_scheme?: string;
  };
}

const appTable: AppTable = {
  accuweather: {
    name: "AccuWeather",
    app_icon: accuweatherIcon,
    launcher: "package",
    package: "com.accuweather.android",
  },
  allrecipes: {
    name: "AllRecipes",
    app_icon: allrecipesIcon,
    launcher: "package",
    package: "com.allrecipes.spinner.free",
  },
  amazon_music: {
    name: "Amazon Music",
    app_icon: amazonMusicIcon,
    launcher: "uri_scheme",
    package: "com.amazon.mp3",
    uri_scheme: "amznmp3://",
  },
  amazon_shopping: {
    name: "Amazon Shopping",
    app_icon: amazonShoppingIcon,
    launcher: "uri_scheme",
    package: "com.amazon.windowshop",
    uri_scheme: "amazon://",
  },
  amcrest_smart_home: {
    name: "Amcrest Smart Home",
    app_icon: amcrestSmartHomeIcon,
    launcher: "package",
    package: "com.mm.android.amcrestsmarthome",
  },
  apple_music: {
    name: "Apple Music",
    app_icon: appleMusicIcon,
    launcher: "package",
    package: "com.apple.android.music",
  },
  bmw: {
    name: "My BMW",
    app_icon: bmwIcon,
    launcher: "package",
    package: "de.bmw.connected.mobile20.na",
  },
  bond: {
    name: "Bond Home",
    app_icon: bondIcon,
    launcher: "package",
    package: "io.olibra.bondapp",
  },
  bring: {
    name: "Bring!",
    app_icon: bringIcon,
    launcher: "package",
    package: "ch.publisheria.bring",
  },
  calculator: {
    name: "Calculator",
    app_icon: calculatorIcon,
    launcher: "package",
    package: "com.google.android.calculator",
  },
  chatgpt: {
    name: "ChatGPT",
    app_icon: chatgptIcon,
    launcher: "package",
    package: "com.openai.chatgpt",
  },
  chrome: {
    name: "Chrome",
    app_icon: chromeIcon,
    launcher: "uri_scheme",
    uri_scheme: "chrome://",
    package: "com.android.chrome",
  },
  clock: {
    name: "Clock/Timer",
    app_icon: clockTimerIcon,
    launcher: "package",
    package: "com.google.android.deskclock",
  },
  doordash: {
    name: "Doordash",
    app_icon: doordashIcon,
    launcher: "uri_scheme",
    uri_scheme: "doordash://",
    package: "com.dd.dashdash",
  },
  eufy_security: {
    name: "Eufy Security",
    app_icon: eufySecurityIcon,
    launcher: "package",
    package: "com.oceanwing.battery.cam",
  },
  grubhub: {
    name: "Grubhub",
    app_icon: grubhubIcon,
    launcher: "uri_scheme",
    uri_scheme: "grubhub://",
    package: "com.grubhub.android",
  },
  home_connect: {
    name: "Home Connect",
    app_icon: homeConnectIcon,
    launcher: "package",
    package: "com.bshg.homeconnect.android.release.na",
  },
  hue: {
    name: "Hue",
    app_icon: hueIcon,
    launcher: "package",
    package: "com.philips.lighting.hue2",
  },
  hulu: {
    name: "Hulu",
    app_icon: huluIcon,
    launcher: "uri_scheme",
    uri_scheme: "hulu://",
    package: "com.hulu.plus",
  },
  irobot: {
    name: "iRobot",
    app_icon: irobotIcon,
    launcher: "package",
    package: "com.irobot.home",
  },
  keurig: {
    name: "Keurig",
    app_icon: keurigIcon,
    launcher: "package",
    package: "com.keurig.kconnect",
  },
  lionchief: {
    name: "LionChief",
    app_icon: lionchiefIcon,
    launcher: "package",
    package: "com.lionel.lionchief",
  },
  lutron: {
    name: "Lutron",
    app_icon: lutronIcon,
    launcher: "package",
    package: "com.lutron.mmw",
  },
  myq: {
    name: "MyQ",
    app_icon: myqIcon,
    launcher: "package",
    package: "com.chamberlain.android.liftmaster.myq",
  },
  nest: {
    name: "Nest",
    app_icon: nestIcon,
    launcher: "package",
    package: "com.nest.android",
  },
  netflix: {
    name: "Netflix",
    app_icon: netflixIcon,
    launcher: "package",
    package: "com.netflix.mediaclient",
  },
  pandora: {
    name: "Pandora",
    app_icon: pandoraIcon,
    launcher: "uri_scheme",
    uri_scheme: "pandora://",
    package: "com.pandora.android",
  },
  play_store: {
    name: "Play Store",
    app_icon: playStoreIcon,
    launcher: "package",
    package: "com.android.vending",
  },
  rachio: {
    name: "Rachio",
    app_icon: rachioIcon,
    launcher: "package",
    package: "com.rachio.iro",
  },
  rainbird: {
    name: "Rainbird",
    app_icon: rainbirdIcon,
    launcher: "package",
    package: "com.rainbird",
  },
  ring: {
    name: "Ring",
    app_icon: ringIcon,
    launcher: "uri_scheme",
    uri_scheme: "ring://",
    package: "com.ringapp",
  },
  roku: {
    name: "Roku",
    app_icon: rokuIcon,
    launcher: "package",
    package: "com.roku.remote",
  },
  sense: {
    name: "Sense Energy",
    app_icon: senseIcon,
    launcher: "package",
    package: "com.sense.androidclient",
  },
  shazam: {
    name: "Shazam",
    app_icon: shazamIcon,
    launcher: "package",
    package: "com.shazam.android",
  },
  shipt_shopper: {
    name: "Shipt Shopper",
    app_icon: shiptShopperIcon,
    launcher: "package",
    package: "com.shipt.shopper",
  },
  sleep_number: {
    name: "Sleep Number",
    app_icon: sleepNumberIcon,
    launcher: "package",
    package: "com.selectcomfort.SleepIQ",
  },
  solitaire: {
    name: "Solitaire",
    app_icon: solitaireIcon,
    launcher: "package",
    package: "com.tripledot.solitaire",
  },
  sonos: {
    name: "Sonos",
    app_icon: sonosIcon,
    launcher: "uri_scheme",
    uri_scheme: "sonos://",
    package: "com.sonos.acr2",
  },
  spotify: {
    name: "Spotify",
    app_icon: spotifyIcon,
    launcher: "uri_scheme",
    uri_scheme: "spotify://",
    package: "com.spotify.music",
  },
  tuya_smart: {
    name: "Tuya Smart",
    app_icon: tuyaSmartIcon,
    launcher: "package",
    package: "com.tuya.smart",
  },
  uber_eats: {
    name: "Uber Eats",
    app_icon: uberEatsIcon,
    launcher: "package",
    package: "com.ubercab.eats",
  },
  weather_channel: {
    name: "Weather Channel",
    app_icon: weatherChannelIcon,
    launcher: "package",
    package: "com.weather.Weather",
  },
  weather_underground: {
    name: "Weather Underground",
    app_icon: weatherUndergroundIcon,
    launcher: "package",
    package: "com.wunderground.android.weather",
  },
  yummly: {
    name: "Yummly Recipes",
    app_icon: yummlyIcon,
    launcher: "package",
    package: "com.yummly.android",
  },
};

export default appTable;