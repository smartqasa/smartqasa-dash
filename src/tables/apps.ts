import accuweatherIcon from "../assets/app_icons/accuweather.webp";
import alexaIcon from "../assets/app_icons/alexa.webp";
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
import clockTimerIcon from "../assets/app_icons/clock.webp";
import doordashIcon from "../assets/app_icons/doordash.webp";
import eufyHomeIcon from "../assets/app_icons/eufy_home.webp";
import eufySecurityIcon from "../assets/app_icons/eufy_security.webp";
import googleAssistantIcon from "../assets/app_icons/google_assistant.webp";
import googleChromeIcon from "../assets/app_icons/google_chrome.webp";
import googleMapsIcon from "../assets/app_icons/google_maps.webp";
import grubhubIcon from "../assets/app_icons/grubhub.webp";
import homeConnectIcon from "../assets/app_icons/home_connect.webp";
import hueIcon from "../assets/app_icons/hue.webp";
import huluIcon from "../assets/app_icons/hulu.webp";
import irobotIcon from "../assets/app_icons/irobot.webp";
import keurigIcon from "../assets/app_icons/keurig.webp";
import lionchiefIcon from "../assets/app_icons/lionel_chief.webp";
import lutronIcon from "../assets/app_icons/lutron.webp";
import lyftIcon from "../assets/app_icons/lyft.webp";
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
        uri_scheme: "",
    },
    alexa: {
        name: "Alexa",
        app_icon: alexaIcon,
        launcher: "package",
        package: "com.amazon.dee.app",
        uri_scheme: "alexa://",
    },
    allrecipes: {
        name: "AllRecipes",
        app_icon: allrecipesIcon,
        launcher: "package",
        package: "com.allrecipes.spinner.free",
        uri_scheme: "",
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
        uri_scheme: "",
    },
    apple_music: {
        name: "Apple Music",
        app_icon: appleMusicIcon,
        launcher: "package",
        package: "com.apple.android.music",
        uri_scheme: "",
    },
    bmw: {
        name: "My BMW",
        app_icon: bmwIcon,
        launcher: "uri_scheme",
        package: "de.bmw.connected.mobile20.na",
        uri_scheme: "bmwconnected://",
    },
    bond: {
        name: "Bond Home",
        app_icon: bondIcon,
        launcher: "package",
        package: "io.olibra.bondapp",
        uri_scheme: "",
    },
    bring: {
        name: "Bring!",
        app_icon: bringIcon,
        launcher: "package",
        package: "ch.publisheria.bring",
        uri_scheme: "",
    },
    calculator: {
        name: "Calculator",
        app_icon: calculatorIcon,
        launcher: "package",
        package: "com.google.android.calculator",
        uri_scheme: "",
    },
    chatgpt: {
        name: "ChatGPT",
        app_icon: chatgptIcon,
        launcher: "package",
        package: "com.openai.chatgpt",
        uri_scheme: "",
    },
    clock: {
        name: "Clock/Timer",
        app_icon: clockTimerIcon,
        launcher: "package",
        package: "com.google.android.deskclock",
        uri_scheme: "",
    },
    doordash: {
        name: "Doordash",
        app_icon: doordashIcon,
        launcher: "uri_scheme",
        package: "com.dd.dashdash",
        uri_scheme: "doordash://",
    },
    eufy_home: {
        name: "Eufy Clean",
        app_icon: eufyHomeIcon,
        launcher: "uri_scheme",
        package: "com.eufylife.smarthome",
        uri_scheme: "eufyhome://",
    },
    eufy_security: {
        name: "Eufy Security",
        app_icon: eufySecurityIcon,
        launcher: "package",
        package: "com.oceanwing.battery.cam",
        uri_scheme: "eufysecurity://",
    },
    google_assistant: {
        name: "Google Assistant",
        app_icon: googleAssistantIcon,
        launcher: "package",
        package: "com.google.android.apps.googleassistant",
        uri_scheme: "googleassistant:",
    },
    google_chrome: {
        name: "Google Chrome",
        app_icon: googleChromeIcon,
        launcher: "package",
        package: "com.android.chrome",
        uri_scheme: "googlechrome:",
    },
    google_maps: {
        name: "Google Maps",
        app_icon: googleMapsIcon,
        launcher: "uri_scheme",
        package: "com.google.android.apps.maps",
        uri_scheme: "googlemaps://",
    },
    grubhub: {
        name: "Grubhub",
        app_icon: grubhubIcon,
        launcher: "uri_scheme",
        package: "com.grubhub.android",
        uri_scheme: "grubhub://",
    },
    home_connect: {
        name: "Home Connect",
        app_icon: homeConnectIcon,
        launcher: "package",
        package: "com.bshg.homeconnect.android.release.na",
        uri_scheme: "",
    },
    hue: {
        name: "Hue",
        app_icon: hueIcon,
        launcher: "package",
        package: "com.philips.lighting.hue2",
        uri_scheme: "",
    },
    hulu: {
        name: "Hulu",
        app_icon: huluIcon,
        launcher: "uri_scheme",
        package: "com.hulu.plus",
        uri_scheme: "hulu://",
    },
    irobot: {
        name: "iRobot",
        app_icon: irobotIcon,
        launcher: "uri_scheme",
        package: "com.irobot.home",
        uri_scheme: "irobot://",
    },
    keurig: {
        name: "Keurig",
        app_icon: keurigIcon,
        launcher: "package",
        package: "com.keurig.kconnect",
        uri_scheme: "",
    },
    lionchief: {
        name: "LionChief",
        app_icon: lionchiefIcon,
        launcher: "package",
        package: "com.lionel.lionchief",
        uri_scheme: "",
    },
    lutron: {
        name: "Lutron",
        app_icon: lutronIcon,
        launcher: "package",
        package: "com.lutron.mmw",
        uri_scheme: "",
    },
    lyft: {
        name: "Lyft",
        app_icon: lyftIcon,
        launcher: "uri_scheme",
        package: "me.lyft.android",
        uri_scheme: "lyft://",
    },
    myq: {
        name: "MyQ",
        app_icon: myqIcon,
        launcher: "package",
        package: "com.chamberlain.android.liftmaster.myq",
        uri_scheme: "",
    },
    nest: {
        name: "Nest",
        app_icon: nestIcon,
        launcher: "package",
        package: "com.nest.android",
        uri_scheme: "",
    },
    netflix: {
        name: "Netflix",
        app_icon: netflixIcon,
        launcher: "uri_scheme",
        package: "com.netflix.mediaclient",
        uri_scheme: "nflx:",
    },
    pandora: {
        name: "Pandora",
        app_icon: pandoraIcon,
        launcher: "uri_scheme",
        package: "com.pandora.android",
        uri_scheme: "pandora:",
    },
    play_store: {
        name: "Play Store",
        app_icon: playStoreIcon,
        launcher: "package",
        package: "com.android.vending",
        uri_scheme: "",
    },
    rachio: {
        name: "Rachio",
        app_icon: rachioIcon,
        launcher: "package",
        package: "com.rachio.iro",
        uri_scheme: "",
    },
    rainbird: {
        name: "Rainbird",
        app_icon: rainbirdIcon,
        launcher: "package",
        package: "com.rainbird",
        uri_scheme: "",
    },
    ring: {
        name: "Ring",
        app_icon: ringIcon,
        launcher: "uri_scheme",
        package: "com.ringapp",
        uri_scheme: "ring://",
    },
    roku: {
        name: "Roku",
        app_icon: rokuIcon,
        launcher: "package",
        package: "com.roku.remote",
        uri_scheme: "",
    },
    sense: {
        name: "Sense Energy",
        app_icon: senseIcon,
        launcher: "package",
        package: "com.sense.androidclient",
        uri_scheme: "",
    },
    shazam: {
        name: "Shazam",
        app_icon: shazamIcon,
        launcher: "package",
        package: "com.shazam.android",
        uri_scheme: "shazam://",
    },
    shipt_shopper: {
        name: "Shipt Shopper",
        app_icon: shiptShopperIcon,
        launcher: "package",
        package: "com.shipt.shopper",
        uri_scheme: "",
    },
    sleep_number: {
        name: "Sleep Number",
        app_icon: sleepNumberIcon,
        launcher: "package",
        package: "com.selectcomfort.SleepIQ",
        uri_scheme: "",
    },
    solitaire: {
        name: "Solitaire",
        app_icon: solitaireIcon,
        launcher: "package",
        package: "com.tripledot.solitaire",
        uri_scheme: "",
    },
    sonos: {
        name: "Sonos",
        app_icon: sonosIcon,
        launcher: "uri_scheme",
        package: "com.sonos.acr2",
        uri_scheme: "sonos://",
    },
    spotify: {
        name: "Spotify",
        app_icon: spotifyIcon,
        launcher: "uri_scheme",
        package: "com.spotify.music",
        uri_scheme: "spotify://",
    },
    tuya_smart: {
        name: "Tuya Smart",
        app_icon: tuyaSmartIcon,
        launcher: "uri_scheme",
        package: "com.tuya.smart",
        uri_scheme: "tuyasmart://",
    },
    uber_eats: {
        name: "Uber Eats",
        app_icon: uberEatsIcon,
        launcher: "uri_scheme",
        package: "com.ubercab.eats",
        uri_scheme: "ubereats://",
    },
    weather_channel: {
        name: "Weather Channel",
        app_icon: weatherChannelIcon,
        launcher: "uri_scheme",
        package: "com.weather.Weather",
        uri_scheme: "weather://",
    },
    weather_underground: {
        name: "Weather Underground",
        app_icon: weatherUndergroundIcon,
        launcher: "uri_scheme",
        package: "com.wunderground.android.weather",
        uri_scheme: "wxunderground://",
    },
    yummly: {
        name: "Yummly Recipes",
        app_icon: yummlyIcon,
        launcher: "package",
        package: "com.yummly.android",
        uri_scheme: "",
    },
};

export default appTable;
