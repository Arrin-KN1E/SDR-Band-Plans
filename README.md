# Open-source Band Plans for SDR Software
<img src="https://i.imgur.com/8GxX1oC.jpg" width="3000"/>
Open-source detailed band plans for greater aid in signal identification, and for those who simply want more from their band plan.  

**If you just want to skip to how to install**: [click here](#installation).  

***

## Table of Contents  <!--                           Don't use capitals or spaces in the link section                    -->
1. [Introduction](#introduction)
   1. [Preview the Band Plans](#preview-the-band-plans)
     1. [Pictures](#preview-the-band-plans)
     1. [Videos](#videos-of-the-bandplans)
   1. [Supported Software](#supported-software)
   1. [Things to Keep in Mind](#things-to-keep-in-mind)
1. [Installation](#installation)
   1. [SDR#](#sdr#​)
   1. [SDR++](#sdr++)
1. [Band Plans Contents](#band-plan-contents)
   1. [US](#us-band-plan-contents)
   1. [International](#international-band-plan-contents)
1. [Latest Updates](#latest-updates)
1. [Useful Links/ Downloads](#useful-links/-downloads)
<!--1. [Sources]()-->
<!--1. [Create Your Own Band plan/ Contributing](#create-your-own-band-plan)-->
<!--1. [US Band Plan Contents](#us-band-plan-contents)-->
<!--1. [Broadcast](#broadcast)-->
<!--1. [Ham](#ham)-->
<!--1. [Satellites](#satellites)-->
<!--1. [ISM](#ism)-->
<!--1. [Time Signals](#time-signals)-->
<!--1. [Aeronautical](#aeronautical)-->
<!--1. [Marine](#marine)-->
<!--1. [Submarine Stations](#submarine-stations)-->   
<!--1. [Miscellaneous](#miscellaneous)-->   
<!--1. [International Band Plan Contents](#international-bandplan)-->
<!--1. [Create Your Own Band plan/ Contributing](#create-your-own-band-plan)-->
   <!--1.[French]()-->
***

# Introduction
Hello everyone! Quick backstory, a while back a few users and I on [r/rtlsdr](https://reddit.com/r/rtlsdr) and [r/amateursatellites](https://reddit.com/r/amateursatellites) discussed the creation of a better band plan for SDR. It was my desire to make a decently detailed band plan from then on, so here it is!

I've made the US band plans (where I live) the most detailed and by extension the best maintained, since US allocations are what I'm most familiar with. More detail on what it contains in the 'Contents' section.

The International band plan is a more general version for anyone else in the world. It might also contain allocations that are not correct in your country, so if you want to make sure, you could use the 'Useful Links/ Downloads' resources to try and confirm. The band plan does not contain allocations in some spots since different regions might have numerous wildly different allocations. It is still an upgrade from most default band plans though. More detail on what it contains in the 'Contents' section.

This project is also an opportunity for people to make band plans for their own areas. Those created band plans could then be added to this repository to make a number of band plans available to everyone in the SDR community and expand the usefulness of this project.  

I will try to support as many SDR programs as I can, but what is easiest to work with will be the most up to date.  

***

## Preview the Band Plans


<img src="https://i.imgur.com/t2JzvMe.jpg" width="3000"/>  

**Showing the 137.1MHz Area (SDR#)**


<img src="https://i.imgur.com/zvId3wS.jpg" width="3000"/>  

**Showing the 146MHz Area (SDR++)** (Sorry for all the interference)


<img src="https://i.imgur.com/COdKQQn.jpg" width="3000"/>

**Showing the 4.3MHz Area (SDR++)** (No signal at the time.) (WEFAX is only in US version.)



### Videos of the Bandplans
If you want to a different view of the plans I have some old videos showing the initial band plan release, Just keep in mind a lot has been updated since then. I plan on updating this soon:

- [Here is the US plan in SDR#](https://youtu.be/Azj1fn24qsA)
- [Here is a scroll through the US code](https://www.youtube.com/watch?v=T091WzRwMAQ)
- [International plan in SDR#](https://youtu.be/u709OSG_Abg)
- [Video of the code too](https://youtu.be/Rhgy7woPk50)

***

### Supported Software
| Region/ Version  | SDR# | SDR++ |
|------------------|------|-------|
| USA              |🟩   | 🟨    |
| French           |🟦   | ⬜    |  
| International    |🟩   | 🟥    |
| Build Your Own   |🟩   | 🟪    |

<!-- Add from SDR++ Band Plans -->

Legend:  

⬜ - In the Future  
🟪 - Next Update  
🟦 - Partial Band Plan  
🟩 - Full Support  
🟨 - Preliminary/ Review  
🟧 - Experimental  
🟥 - No Plan to Support (Open to Requests)  
🔳 - Adapted from Other Works/ 'As is'  

***

### Things to Keep in Mind  
- Sources for the allocations are in the comments of the band plan file for XML (SDR#). JSON (SDR++) does not natively support comments so refer to the XML file comments for sources.
- Alternatively, you can reference the sources folder. However, it is limited to avoid any potential copyright issues.
- Make sure to use the 'Useful Links/ Downloads' resources if your trying to confidently identify a signal.  
- Watch out for interference, harmonics, and be aware of the limitations of your SDR (e.g. Signals can appear to be at a frequency they really are not [for various technical reasons]).  
- Since band plans are meant to be an aid in helping identify an unknown signal I tried to make them as detailed as possible without making them too cluttered, so some signals might be from a secondary allocation user that couldn't be listed.  
- When using the band plan you may need to zoom in a lot to read the allocation name, since a named allocation is the same width as the signals bandwidth.
- Don't take the band plans as infallible; local areas can have slightly different allocations.  

***
# Installation

### SDR#​
*Make sure to have a backup of the old default band plan in case something doesn't work!*

**It's as easy as dropping it in the SDR# folder.**  

<img src="https://i.imgur.com/RrgZ5Ki.png" width="3000"/>

[**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip), extract it, navigate to the file you want (US,  International, etc. e.g. *SDR-Band-Plans-master>US>SDR#*), then drag and drop "`BandPlan`" it in.  

***

### SDR++
***Currently in testing, this process may change in the future!***

*Make sure to have a backup of the old `config` file in case something doesn't work!*

**SDR++ takes a little more work, but still is easy enough:**

<img src="https://i.imgur.com/ZwvncI3.jpg" width="3000"/>

Locate the band plans folder in SDR++; example for windows: *sdrpp_windows_x64>res>bandplans*

[**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip), extract it, navigate to the file you want (US,  International, etc. e.g. *SDR-Band-Plans-master>US>SDR++*), then drag and drop the JSON file (e.g. 'usa-kn1e') into the 'bandplans' folder.

So far, this would show the allocations if selected in SDR++, but there would be no color to the band plan banners. To do this, open the "`Config BandColors Modification.txt`" and copy all of the text in the file. (If new, run SDR++ to generate a config file) Open the `config` file and paste the copied text in the "`"bandColors": {` field:

  <img src="https://i.imgur.com/iWjZ6qo.jpg" width="3000"/>

*Correct any formatting errors and make sure they all have commas.*

Save and open SDR++, if it looks like the sample images, it's good to go!  

The strange hex format basically brute-force converts the color format used in SDR# to the color format used in SDR++. It was easier to adapt the XML file to JSON this way, but this will most likely be updated in the future, but the process will stay the same.

***
# Band Plan Contents

## US Band Plan Contents
**The US plan contains, among many other things not listed:**

### Broadcast
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television Channels 2 to 69 *Note: Some TV channels are no longer used for TV anymore.                                                               

### Ham
2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m, 17m, 15m, 12m, 10m, 6m, 2m, 1.25m, 70cm, 33cm, 23cm, 13cm, 9cm, 5cm, 3cm   (w/ ARRL BPs)

### Satellites
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT, CDA, Telemetry, Command), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A, Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging), Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), SiriusXM Satellites, Milstar, NOAA-20/ JPSS (TDRSS, Telemetry, Command), SNPP (TDRSS, Telemetry, Command), Starlink(U/D), TRDS(U/D)    

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

***

<!-- ## French Band Plan Contents -->

## International Band Plan Contents
Quick Author's Note on the band plan: It is impossible to compile a list that every country can agree on, so I went with what I thought would likely be the best choice. I live in the US so I have no experience or familiarity with frequencies other than those in the US, so it's within reason that I will make mistakes/ seemingly unfounded choices. There also might be a few things missing from this list for a variety of reasons. It's just meant to be better than the default.

**The International plan contains, among many other things not listed:**

### Broadcast
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television (Generalized)

### Ham
With (ARRL) Bandplans: 2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m  
Without Bandplans: 17m, 15m, 12m, 10m, 6m, 2m, 70cm, 23cm, 13cm   

### Satellites
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A,
Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging),
Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), SiriusXM Satellites,

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

***

## Create Your Own Band plan
The purpose of the efforts here are to aid SDR users in the ability to identify signals and bands with greater ease than before. With a basic layout file provided ('Create your own Band plan') it gives users anywhere the ability to assign a band plan to their regional or personal needs, which can then be shared with the greater SDR community if desired.
It has a simple layout with nothing more than a basic structure that the writer can adhere to if they desire. Luckily XML is a simple language that can be easily learned by those even with little skill in programming.  

***

## Latest Updates

Addition of sources below the allocations in the SDR# XML file's comments (about every 25 lines).

Starlink and TDRS Downlink and Uplink frequencies added to both SDR# and SDR++ versions.

***

# Useful Links/ Downloads
1. [FCC Online Table of Frequency Allocations (Federal and Nonfederal, and ITU Regions 1, 2, & 3) PDF](https://transition.fcc.gov/oet/spectrum/table/fcctable.pdf)  
1. [FCC ID.io - A more User-Friendly Version of the 'FCC Table of Frequency Allocations' PDF](https://fccid.io/frequency-explorer.php?lower=100&upper=1000)  
1. [European Table of Frequency Allocations PDF](https://www.itu.int/ITU-D/study_groups/SGP_2002-2006/JGRES09/CEPT2.pdf)  
1. [IEEE Database of Frequency Allocations for all ITU Countries](http://www.grss-ieee.org/frequency_allocations.html)  
1. [Signal ID Wiki - Ubiquitous, but missing many niche allocations. Still might be worth checking.](https://www.sigidwiki.com/wiki/Database)
1. [You can use an ATSC pilot carrier to calibrate your SDR. Using 'ATSC pilot' from these tables.](https://www.sigidwiki.com/wiki/ATSC_Broadcast#Frequencies)
1. [inSSIDer - A Program for Viewing 2.4GHz and 5GHz WiFi Channels (Uses your WiFi card, not SDR#.)](https://www.metageek.com/inssider/)
