import homeIcon from '../assets/channel_icons/home.webp';
import aeIcon from '../assets/channel_icons/a_e.webp';
import abcIcon from '../assets/channel_icons/abc.webp';
import abdNewsIcon from '../assets/channel_icons/abc_news.webp';
import adultSwimIcon from '../assets/channel_icons/adult_swim.webp';
import animalPlanetGoIcon from '../assets/channel_icons/animal_planet_go.webp';
import appleTvIcon from '../assets/channel_icons/apple_tv.webp';
import bbcAmericaIcon from '../assets/channel_icons/bbc_america.webp';
import bluetoothAudioIcon from '../assets/channel_icons/bluetooth_audio.webp';
import bodiByBeachbodyIcon from '../assets/channel_icons/bodi_by_beachbody.webp';
import bravoIcon from '../assets/channel_icons/bravo.webp';
import cbsIcon from '../assets/channel_icons/cbs.webp';
import cbsNewsIcon from '../assets/channel_icons/cbs_news.webp';
import cbsSportsIcon from '../assets/channel_icons/cbs_sports.webp';
import cnnIcon from '../assets/channel_icons/cnn.webp';
import curiosityStreamIcon from '../assets/channel_icons/curiosity_stream.webp';
import dailyDocumentaryIcon from '../assets/channel_icons/daily_documentary.webp';
import directvIcon from '../assets/channel_icons/directv.webp';
import discoveryGoIcon from '../assets/channel_icons/discovery_go.webp';
import discoveryPlusIcon from '../assets/channel_icons/discovery_plus.webp';
import disneyPlusIcon from '../assets/channel_icons/disney_plus.webp';
import espnIcon from '../assets/channel_icons/espn.webp';
import fandangoAtHomeIcon from '../assets/channel_icons/fandango_at_home.webp';
import foxSportsIcon from '../assets/channel_icons/fox_sports.webp';
import fxNowIcon from '../assets/channel_icons/fx_now.webp';
import foxbusinessIcon from '../assets/channel_icons/fox_business.webp';
import foxNationIcon from '../assets/channel_icons/fox_nation.webp';
import foxNewsIcon from '../assets/channel_icons/fox_news.webp';
import freebieTvIcon from '../assets/channel_icons/freebie_tv.webp';
import freeveeIcon from '../assets/channel_icons/freevee.webp';
import fuboIcon from '../assets/channel_icons/fubo.webp';
import hgtvGoIcon from '../assets/channel_icons/hgtv_go.webp';
import historyIcon from '../assets/channel_icons/history.webp';
import hallmarkTvIcon from '../assets/channel_icons/hallmark_tv.webp';
import huluIcon from '../assets/channel_icons/hulu.webp';
import iheartIcon from '../assets/channel_icons/iheart.webp';
import ipCameraViewerProIcon from '../assets/channel_icons/ip_camera_viewer_pro.webp';
import kidsAndFamilyRokuIcon from '../assets/channel_icons/kids_and_family_roku.webp';
import liveTvGuideIcon from '../assets/channel_icons/live_tv_guide.webp';
import liveTvOnRokuIcon from '../assets/channel_icons/live_tv_on_roku.webp';
import localNowIcon from '../assets/channel_icons/local_now.webp';
import mlbIcon from '../assets/channel_icons/mlb.webp';
import masterclassIcon from '../assets/channel_icons/masterclass.webp';
import maxIcon from '../assets/channel_icons/max.webp';
import nasaIcon from '../assets/channel_icons/nasa.webp';
import nbcIcon from '../assets/channel_icons/nbc.webp';
import nbcSportsIcon from '../assets/channel_icons/nbc_sports.webp';
import nflIcon from '../assets/channel_icons/nfl.webp';
import natGeoTvIcon from '../assets/channel_icons/nat_geo_tv.webp';
import netflixIcon from '../assets/channel_icons/netflix.webp';
import newsmaxIcon from '../assets/channel_icons/newsmax.webp';
import newsonIcon from '../assets/channel_icons/newson.webp';
import oxygenIcon from '../assets/channel_icons/oxygen.webp';
import pandoraIcon from '../assets/channel_icons/pandora.webp';
import paramountPlusIcon from '../assets/channel_icons/paramount_plus.webp';
import peacockTvIcon from '../assets/channel_icons/peacock_tv.webp';
import philoIcon from '../assets/channel_icons/philo.webp';
import plexIcon from '../assets/channel_icons/plex.webp';
import plutoTvIcon from '../assets/channel_icons/pluto_tv.webp';
import primeVideoIcon from '../assets/channel_icons/prime_video.webp';
import reDiscoverTelevisionIcon from '../assets/channel_icons/rediscover_television.webp';
import rokuPhotoStreamsIcon from '../assets/channel_icons/roku_photo_streams.webp';
import rokuGettingStartedIcon from '../assets/channel_icons/roku_getting_started.webp';
import secTvIcon from '../assets/channel_icons/sec_tv.webp';
import slingTvIcon from '../assets/channel_icons/sling_tv.webp';
import spectrumTvIcon from '../assets/channel_icons/spectrum_tv.webp';
import spotifyIcon from '../assets/channel_icons/spotify.webp';
import tlcGoIcon from '../assets/channel_icons/tlc_go.webp';
import theCwIcon from '../assets/channel_icons/the_cw.webp';
import theGreatCoursesPlusIcon from '../assets/channel_icons/the_great_courses_plus.webp';
import theRokuChannelIcon from '../assets/channel_icons/roku_channel.webp';
import theWeatherChannelIcon from '../assets/channel_icons/weather_channel.webp';
import travelChannelGoIcon from '../assets/channel_icons/travel_channel_go.webp';
import truTvIcon from '../assets/channel_icons/tru_tv.webp';
import tubiIcon from '../assets/channel_icons/tubi.webp';
import veryLocalIcon from '../assets/channel_icons/very_local.webp';
import vixIcon from '../assets/channel_icons/vix.webp';
import watchTntIcon from '../assets/channel_icons/watch_tnt.webp';
import weahterNationIcon from '../assets/channel_icons/weathernation.webp';
import youTubeIcon from '../assets/channel_icons/youtube.webp';
import youTubeTvIcon from '../assets/channel_icons/youtube_tv.webp';
import xumoPlayIcon from '../assets/channel_icons/xumo_play.webp';

interface ChannelTable {
    [name: string]: string;
}

const channelTable: ChannelTable = {
    Home: homeIcon,
    'A&E': aeIcon,
    'ABC: Watch TV Shows & News': abcIcon,
    'ABC News: Live & Breaking News': abdNewsIcon,
    'Adult Swim': adultSwimIcon,
    'Animal Planet GO': animalPlanetGoIcon,
    'Apple TV': appleTvIcon,
    'BBC America': bbcAmericaIcon,
    'Bluetooth Audio': bluetoothAudioIcon,
    'BODi by Beachbody': bodiByBeachbodyIcon,
    Bravo: bravoIcon,
    CBS: cbsIcon,
    'CBS News': cbsNewsIcon,
    'CBS Sports Stream & Watch Live': cbsSportsIcon,
    CNN: cnnIcon,
    'Curiosity Stream': curiosityStreamIcon,
    'Daily Documentary': dailyDocumentaryIcon,
    DIRECTV: directvIcon,
    'Discovery GO': discoveryGoIcon,
    'discovery+ | Stream TV Shows': discoveryPlusIcon,
    'Disney Plus': disneyPlusIcon,
    ESPN: espnIcon,
    'Fandango at Home': fandangoAtHomeIcon,
    'FOX Sports': foxSportsIcon,
    FXNOW: fxNowIcon,
    'Fox Business Network': foxbusinessIcon,
    'Fox Nation': foxNationIcon,
    'Fox News: US, World, & Election Headlines': foxNewsIcon,
    'Freebie TV Free Movies & TV': freebieTvIcon,
    Freevee: freeveeIcon,
    'Fubo: Watch Live TV & Sports': fuboIcon,
    'HGTV GO': hgtvGoIcon,
    HISTORY: historyIcon,
    'Hallmark TV': hallmarkTvIcon,
    Hulu: huluIcon,
    'IP Camera Viewer - Pro': ipCameraViewerProIcon,
    iHeart: iheartIcon,
    'Kids & Family on The Roku Channel': kidsAndFamilyRokuIcon,
    'Live TV Guide': liveTvGuideIcon,
    'Live TV on The Roku Channel': liveTvOnRokuIcon,
    'Local Now': localNowIcon,
    MLB: mlbIcon,
    'MasterClass - Learn New Skills': masterclassIcon,
    Max: maxIcon,
    NASA: nasaIcon,
    NBC: nbcIcon,
    'NBC Sports': nbcSportsIcon,
    NFL: nflIcon,
    'Nat Geo TV': natGeoTvIcon,
    Netflix: netflixIcon,
    Newsmax: newsmaxIcon,
    NewsON: newsonIcon,
    OXYGEN: oxygenIcon,
    Pandora: pandoraIcon,
    'Paramount Plus': paramountPlusIcon,
    'Peacock TV': peacockTvIcon,
    Philo: philoIcon,
    'Plex - Free Movies & TV': plexIcon,
    "Pluto TV - It's Free TV": plutoTvIcon,
    'Prime Video': primeVideoIcon,
    'reDiscover Television': reDiscoverTelevisionIcon,
    'Roku Photo Streams': rokuPhotoStreamsIcon,
    'Roku | Getting Started': rokuGettingStartedIcon,
    'SEC TV': secTvIcon,
    'Sling TV - Live Sports, News, Shows + Freestream': slingTvIcon,
    'Spectrum TV': spectrumTvIcon,
    Spotify: spotifyIcon,
    'TLC GO': tlcGoIcon,
    'The CW': theCwIcon,
    'The Great Courses Plus': theGreatCoursesPlusIcon,
    'The Roku Channel': theRokuChannelIcon,
    'The Weather Channel': theWeatherChannelIcon,
    'Travel Channel GO': travelChannelGoIcon,
    truTV: truTvIcon,
    'Tubi - Free Movies & TV': tubiIcon,
    'Very Local: Free Local News, Original Series & More': veryLocalIcon,
    'ViX: TV, Deportes y Noticias': vixIcon,
    'Watch TNT': watchTntIcon,
    WeatherNation: weahterNationIcon,
    YouTube: youTubeIcon,
    'YouTube TV': youTubeTvIcon,
    'Xumo Play': xumoPlayIcon,
};

export default channelTable;
