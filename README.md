# Bandplans for SDRsharp
These are custom bandplan files for SDR#. They are an update on the default bandplans by being more detailed. Bandplans are meant to be an aid for signal identification.  

If you just want to know how to install it, [click here](#installation).


### Useful Links/ Downloads
1. [FCC Online Table of Frequency Allocations (Federal and Nonfederal, and ITU Regions 1, 2, & 3) PDF](https://transition.fcc.gov/oet/spectrum/table/fcctable.pdf)  
1. [FCC ID.io - A more User-Friendly Version of the 'FCC Table of Frequency Allocations' PDF](https://fccid.io/frequency-explorer.php?lower=100&upper=1000)  
1. [European Table of Frequency Allocations PDF](https://www.ecodocdb.dk/download/2ca5fcbd-4090/ERCREP025.pdf)  
1. [IEEE Database of Frequency Allocations for all ITU Countries (A Bandplan Alt. for Non-US End Users)](http://www.grss-ieee.org/frequency_allocations.html)  
1. [inSSIDer - A Program for Viewing 2.4GHz and 5.8GHz Wifi Channels (Does not use an SDR)](https://www.metageek.com/products/inssider/) 


## Table of Contents  <!--                           Don't use capitals or spaces in the link section                    -->
1. [Introduction](#introduction)
1. [Preview the Bandplans](#preview-the-bandplans)
   1. [Pictures](#preview-the-bandplans)
   1. [Videos](#videos-of-the-bandplans)
   1. [The Raw XMLs](#raw-xml)
1. [US Bandplan Contents](#us-band-plan-contents)
   1. [Broadcast](#broadcast)
   1. [Commercial Stations](#commercial-stations)
   1. [Secret Stations](#secret-stations)
   1. [Ham](#ham)
   1. [Satellites](#satellites)
   1. [ISM](#ism)
   1. [Time Signals](#time-signals)
   1. [Aeronautical](#aeronautical)
   1. [Marine](#marine)
   1. [Submarine Stations](#submarine-stations)   
   1. [Miscellaneous](#miscellaneous)   
1. [International Bandplan Contents](#international-bandplan)
1. [Installation](#installation)
1. [Create Your Own Bandplan/ Contributing](#create-your-own-bandplan)
1. [What Was Added in the Latest Update](#what-was-added-in-latest-update)
1. [Conclusion](#conclusion)


## Introduction
Hello everyone! Quick backstory, a while back a few users and I on [r/rtlsdr](https://reddit.com/r/rtlsdr) and [r/amateursatellites](https://reddit.com/r/amateursatellites) discussed the creation of a better bandplan for SDR#. It was my desire to make a decently detailed bandplan from then on, so here it is! 

I've made the US Bandplan (where I live) the most detailed, since US allocations are what I'm most familiar with. More detail on what it contains in the 'Contents' section.

The International Bandplan is a more general version for anyone else in the world. It also might contain allocations that are not correct in your country, so if you want to make sure, you could use the 'Useful Links/ Downloads' resources to try and confirm. The bandplan does not contain allocations in some spots since different regions might have numerous wildly different allocations. It is still an upgrade from the default SDRsharp bandplan though. More detail on what it contains in the 'Contents' section.

This project is also an opportunity for people to make bandplans for their own areas. Those bandplans could then be added to this repository to make a number of bandplans avaliable to everyone in the SDR community and expand the usefulness of this project.  

Also, a few things to keep in mind!  
- Make sure to use the 'Useful Links/ Downloads' resources if your trying to confidently identify a signal.  
- Watch out for interference, harmonics, and be aware of the limitations of your SDR (e.g. Signals can appear to be at a frequency they really are not [for various technical reasons]).  
- Since bandplans are meant to be an aid in helping identify an unknown signal I tried to make them as detailed as possible without making them cluttered, so some signals might be from a secondary allocation user that couldn't be listed.  
- When using the bandplan you may need to zoom in a lot to read the allocation name, since a named allocation is the same width as the signals bandwidth.   



## Preview the Bandplans

**Showing the 137MHz Area**
<img src="https://i.imgur.com/0LMlxku.png" width="3000"/>
**Showing the 145MHz Satellites** (Sorry for the interference)
<img src="https://i.imgur.com/aKaGL6U.png" width="3000"/>  
**Showing the 4.3MHz Area** (My HamitUp was being used elsewhere, sorry.)(WEFAX is only in US version.)
<img src="https://i.imgur.com/tKfb0Yb.png" width="3000"/>

### Videos of the Bandplans
If you want to a different view of the plans I have some old videos showing the initial bandplan release, Just keep in mind a lot has been updated since then:

- [Here is the US plan in SDR#](https://youtu.be/Azj1fn24qsA)
- [Here is a scroll through the US code](https://www.youtube.com/watch?v=T091WzRwMAQ)
- [International plan in SDR#](https://youtu.be/u709OSG_Abg)
- [Video of the code too](https://youtu.be/Rhgy7woPk50)

Note: Updated videos will be made in the future when I know I've added all of the public interest allocations!


### Raw XML
[US BandPlan (Raw XML)](https://raw.githubusercontent.com/Arrin-KN1E/SDRsharpbandplans/master/US/BandPlan.xml)  
[International BandPlan (Raw XML)](https://raw.githubusercontent.com/Arrin-KN1E/SDRsharpbandplans/master/International/BandPlan.xml)  
[Create Your Own Bandplan (Raw XML)](https://raw.githubusercontent.com/Arrin-KN1E/SDRsharpbandplans/master/Create-Your-Own/Create-Your_Own.xml) 


## Installation

**It's as easy as dropping it in the SDR# folder.**  

<img src="https://i.imgur.com/RrgZ5Ki.png" width="3000"/>

Click on the Green 'Code button', download the ZIP file, extract it, navigate to the file you want, then drag and drop it in.  
Just make sure to have a backup of the old default bandplan in case something doesn't work! 


## US Band Plan Contents
**The US plan contains, among many other things not listed:**

### Broadcast
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television Channels 2 to 69 *Note: Some TV channels are no longer used for TV anymore.  

### Commercial Stations: 
BBC Radio 4 (198 kHz)                                                                

### Secret Stations
UVB-76 (4625KHz and 4810KHz), The Pip (5448 KHz [Day]/ 3756 KHz[Night])   


### Ham
2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m, 17m, 15m, 12m, 10m, 6m, 2m, 1.25m, 70cm, 33cm, 23cm, 13cm   (w/ ARRL BPs) 

### Satellites
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT, CDA, Telemetry, Command), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A, Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging), Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), SiriusXM Satellites, Milstar, NOAA-20/ JPSS (TDRSS, Telemetry, Command), SNPP (TDRSS, Telemetry, Command)  

### ISM
50m (6.7MHz), 22m (13.7MHz, inside HiFER), 10m (27MHz), 8m (40MHz), 70cm (433MHz) (Not ISM but Common Use Part 15), 33cm (900MHz), 13cm (2.5GHz)  

### Time Signals
20KHz Time Signal, WWVB, WWV (2.5, 5, 10, 15, 20, 25), CHU (3.33, 7.85, 14.670), JJY-40 (40 KHz)(Japan), RBU (66.66 KHz)(Russia), BPC (68.5 KHz)(China), DCF77 (77.5 kHz)(Germany), TDF (162 kHz)(France)   

### Aeronautical
ADSB 978, ADSB 1090, ACARS, Air Band VOR/ILS, Air Band Voice, Civilian Aircraft Distress/ Emergency (121.5 MHz)  

### Marine
2, 4, 6, 8, 12, 16, 18, 22, 25, and 156MHz (Marine VHF) (Marine 4MHz and Marine VHF are expanded to show channels), WEFAX (Boston, New Orleans, Port Reyes), (AIS), and Most Distress Frequencies  <!-- Welcome to my first easter egg!   Did Rich really want that juicy Shaq meat? Or, was it peer pressure that made him say it? -->

### Submarine Stations
NWC (19.8 KHz)(Australia), NPM (21.4 KHz)(US), Jim Creek (NLK) (24.8 KHz)(US), NML (25.2 KHz)(US), NOV (26.9 KHz)(US), SHR (38 KHz)(Sweden), SAS/SRC (40.4 kHz)(Sweden), SAS2 (42.5 kHz)(Sweden), SAS3 (44.2 kHz)(Sweden), GYN2 GBR (81 kHz)(UK)                       


### Miscellaneous
CB, GMRS and FRS, NOAA (NWR), 800MHz Bands, Police/ Fire/ Ambulance/ Business (2m), Hydrogen Line, Industrial/Business Bands, Paging Bands, Railroad H.O.T and E.O.T. (Head and End of train Devices), 220MHz Control/ Telemetry

### More
The files also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.


## International Bandplan
Note for Github: Due to either limitations of my Markup knowledge or Markup itself, I couldn't add the details to the list of contents any way other than changing their names, which I did not want to do. This should be okay though.  

Quick Author's Note on the bandplan: It is an absolute pain to try and compile a list that every country can agree on, so I went with what I thought would likely be the best choice. I live in the US so I have no experience or familiarity with frequencies other than those in the US, so it's within reason that I will make mistakes/ seemingly unfounded choices. There also might be a few things missing from this list for a variety of reasons. Anyway...

**The International plan contains, among many other things not listed:**

### Broadcast
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television (Generalized)

### Ham
With (ARRL) Bandplans: 2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m  
Without Bandplans: 17m, 15m, 12m, 10m, 6m, 2m, 70cm, 23cm, 13cm   

### Satellites
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A, 
Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging), 
Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), 
SiriusXM Satellites  

### ISM
22m (13.5MHz, inside HiFER), 10m (27MHz), 8m (40MHz), 70cm (433MHz) (Europe, Africa, Russia), 33cm (902MHz) (Americas), 13cm (2.5GHz)   

### Time Signals
20KHz Time Signal, WWVB, Generalized 2.5, 5, 10, 15, 20, 25MHz 

### Aeronautical
ADSB 978, ADSB 1090

### Marine
2, 4, 6, 8, 12, 16, 18, 22, 25, and 156MHz (Marine VHF) (Marine 4MHz and Marine VHF are expanded to show channels), WEFAX (Boston, New Orleans, Port Reyes), and Most Distress Frequencies

### More
The files also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.



## Create Your Own Bandplan
The purpose of the efforts here are to give SDR users the ability to identify signals and bands with greater ease than before. With a basic layout file provided ('Create your own Bandplan') it gives users anywhere the ability to assign a bandplan to their regional or personal needs, which can then be shared with the greater SDR community if desired.
It has a simple layout with nothing more than a basic structure that the writer can adhere to if they desire. Luckily XML is a simple language that can be easily learned by those even with little skill in programming.  

The best way to contribute is on GitHub! 

## What Was Added in Latest Update

This section lists the most recent additions to the bandplans. No distinction is given between what was added in the 'US' or 'International' bandplan, but the only named allocations they will likely share are satellites, VLF/ LF frequencies, and a few possibly popular stations.    

*SNPP: TDRSS, Telemetry, Command (2067.27 MHz, 2247.5 MHz )
NOAAs-15, 18, 19: CDA, Telemetry, Command (2247.5 MHz ,2026 MHz, 2247.5 MHz) 
NOAA-20: TDRSS, Telemetry, Command  (2067.27 MHz, 2247.5 MHz )*

*136MHz Aeronautical Data Links: 136.650 - 136.8MHz and 136.975*

*Milstar: 243.785 MHz - 243.822 MHz*

*EMWIN VHF Repeaters 163.3MHz-163.35MHz and 168.7125MHz-168.8125MHz*

*220MHz Command/ Telemetry*

*Marine (AIS): 161.975 MHz — 162.025 MHz*

*Time Stations: JJY-40 (40 KHz)(Japan), RBU (66.66 KHz)(Russia), BPC (68.5 KHz)(China), DCF77 (77.5 kHz)(Germany), TDF (162 kHz)(France)*

 *Submarine Communications: NWC (19.8 KHz)(Australia), NPM (21.4 KHz)(US), Jim Creek (NLK) (24.8 KHz)(US), NML (25.2 KHz)(US), NOV (26.9 KHz)(US), SHR (38 KHz)(Sweden), SAS/SRC (40.4 kHz)(Sweden), SAS2 (42.5 kHz)(Sweden), SAS3 (44.2 kHz)(Sweden), GYN2 GBR (81 kHz)(UK)*

*Commercial Broadcast Stations: BBC Radio 4 (198 kHz)*

*Number Stations/ Secret Stations: UVB-76 (4625KHz and 4810KHz), The Pip (5448 kHz [day]
3756 kHz [night])*

*WEFAX US: Honolulu (9982.5 KHz, 11090KHz, 16135 KHz, Kodiak (2054KHz, 4298KHz, 8459KHz, 12412.5KHz)
WEFAX Canada: Halifax (122.5khZ, 4271KHz, 6496.4KHz, 10536KHz, 13510KHz)(Not Active but Added), Iqaluit (3253KHz, 7710KHz), Resolute (3253KHz, 7710KHz), Sydney -Nova Scotia (4416KHz, 6915.1KHz), Inuvik (4292KHz, 8456KHz)*

And Some General Superficial Improvements


## Conclusion  

This is an ongoing project that may go on for a long time. After I decide the plans are relatively comprehensive I plan on investigating being able to add bandplans to other SDR programs than just SDR#. In the future I plan on adding upto 6GHz (maybe 10GHZ) in the files but commented out since at this time I don't know if SDR# can go over 2.5GHz, but if someone was to look in the file they could see what is above 2.5GHz.  
