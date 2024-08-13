import aeIcon from "../assets/channel_icons/a_e.webp";
import abcIcon from "../assets/channel_icons/apple_tv.webp";
import animalPlanetGoIcon from "../assets/channel_icons/animal_planet_go.webp";
import appleTvIcon from "../assets/channel_icons/apple_tv.webp";
import bbcAmericaIcon from "../assets/channel_icons/bbc_america.webp";
import bravoIcon from "../assets/channel_icons/bravo.webp";
import cbsIcon from "../assets/channel_icons/cbs.webp";
import cbsSportsIcon from "../assets/channel_icons/cbs_sports.webp";
import cnnIcon from "../assets/channel_icons/cnn.webp";
import discoveryGoIcon from "../assets/channel_icons/discovery_go.webp";
import discoveryPlusIcon from "../assets/channel_icons/discovery_plus.webp";
import disneyPlusIcon from "../assets/channel_icons/disney_plus.webp";
import espnIcon from "../assets/channel_icons/espn.webp";
import foxSportsIcon from "../assets/channel_icons/fox_sports.webp";
import fxNowIcon from "../assets/channel_icons/fx_now.webp";
import foxbusinessIcon from "../assets/channel_icons/fox_business.webp";
import foxNewsIcon from "../assets/channel_icons/fox_news.webp";
import fuboIcon from "../assets/channel_icons/fubo.webp";
import hgtvGoIcon from "../assets/channel_icons/hgtv_go.webp";
import historyIcon from "../assets/channel_icons/history.webp";
import hallmarkTvIcon from "../assets/channel_icons/hallmark_tv.webp";
import huluIcon from "../assets/channel_icons/hulu.webp";
import ipCameraViewerProIcon from "../assets/channel_icons/ip_camera_viewer_pro.webp";
import kidsAndFamilyRokuIcon from "../assets/channel_icons/kids_and_family_roku.webp";
import liveTvGuideIcon from "../assets/channel_icons/live_tv_guide.webp";
import liveTvOnRokuIcon from "../assets/channel_icons/roku_channel.webp";
import localNowIcon from "../assets/channel_icons/local_now.webp";
import mlbIcon from "../assets/channel_icons/mlb.webp";
import maxIcon from "../assets/channel_icons/max.webp";
import nasaIcon from "../assets/channel_icons/nasa.webp";
import nbcIcon from "../assets/channel_icons/nbc.webp";
import nbcSportsIcon from "../assets/channel_icons/nbc_sports.webp";
import nflIcon from "../assets/channel_icons/nfl.webp";
import natGeoTvIcon from "../assets/channel_icons/nat_geo_tv.webp";
import netflixIcon from "../assets/channel_icons/netflix.webp";
import newsmaxIcon from "../assets/channel_icons/newsmax.webp";
import oxygenIcon from "../assets/channel_icons/oxygen.webp";
import pandoraIcon from "../assets/channel_icons/pandora.webp";
import paramountPlusIcon from "../assets/channel_icons/paramount_plus.webp";
import peacockTvIcon from "../assets/channel_icons/peacock_tv.webp";
import primeVideoIcon from "../assets/channel_icons/prime_video.webp";
import rokuPhotoStreamsIcon from "../assets/channel_icons/roku_photo_streams.webp";
import secTvIcon from "../assets/channel_icons/sec_tv.webp";
import tlcGoIcon from "../assets/channel_icons/tlc_go.webp";
import theRokuChannelIcon from "../assets/channel_icons/roku_channel.webp";
import theWeatherChannelIcon from "../assets/channel_icons/weather_channel.webp";
import travelChannelGoIcon from "../assets/channel_icons/travel_channel_go.webp";
import truTvIcon from "../assets/channel_icons/tru_tv.webp";
import youtubeIcon from "../assets/channel_icons/youtube.webp";

interface ChannelTable {
    [name: string]: string;
}

const channelTable: ChannelTable = {
    "A&E": aeIcon,
    "ABC: Watch TV Shows & News": abcIcon,
    "Animal Planet GO": animalPlanetGoIcon,
    "Apple TV": appleTvIcon,
    "BBC America": bbcAmericaIcon,
    Bravo: bravoIcon,
    CBS: cbsIcon,
    "CBS Sports Stream & Watch Live": cbsSportsIcon,
    CNN: cnnIcon,
    "Discovery GO": discoveryGoIcon,
    "Discovery Plus": discoveryPlusIcon,
    "Disney Plus": disneyPlusIcon,
    ESPN: espnIcon,
    "FOX Sports": foxSportsIcon,
    FXNOW: fxNowIcon,
    "Fox Business Network": foxbusinessIcon,
    "Fox News: US, World, & Election Headlines": foxNewsIcon,
    "Fubo: Watch Live TV & Sports": fuboIcon,
    "HGTV GO": hgtvGoIcon,
    HISTORY: historyIcon,
    "Hallmark TV": hallmarkTvIcon,
    Hulu: huluIcon,
    "IP Camera Viewer - Pro": ipCameraViewerProIcon,
    "Kids & Family on The Roku Channel": kidsAndFamilyRokuIcon,
    "Live TV Guide": liveTvGuideIcon,
    "Live TV on The Roku Channel": liveTvOnRokuIcon,
    "Local Now": localNowIcon,
    MLB: mlbIcon,
    Max: maxIcon,
    NASA: nasaIcon,
    NBC: nbcIcon,
    "NBC Sports": nbcSportsIcon,
    NFL: nflIcon,
    "Nat Geo TV": natGeoTvIcon,
    Netflix: netflixIcon,
    Newsmax: newsmaxIcon,
    OXYGEN: oxygenIcon,
    Pandora: pandoraIcon,
    "Paramount Plus": paramountPlusIcon,
    "Peacock TV": peacockTvIcon,
    "Prime Video": primeVideoIcon,
    "Roku Photo Streams": rokuPhotoStreamsIcon,
    "SEC TV": secTvIcon,
    "TLC GO": tlcGoIcon,
    "The Roku Channel": theRokuChannelIcon,
    "The Weather Channel": theWeatherChannelIcon,
    "Travel Channel GO": travelChannelGoIcon,
    truTV: truTvIcon,
    YouTube: youtubeIcon,
};

export default channelTable;
