<!-- -->
# Open-source Band Plans for SDR Software.

<img src="https://i.imgur.com/8GxX1oC.jpg" width="3000"/>  

> **_A section of the 137MHz region in SDR++_**
## 
#### Quick links:
- **[*\*U.S. band plan contents*](#us-band-plan-contents)**
- **[*\*International band plan contents*](#international-band-plan-contents)**

- **[*\*Installation section*](#installation)**

***

# Table of Contents  <!-- Don't use capitals, spaces, or '/' in the link section, that is in the parenthesis. '1. []' for numbered, '- []' for bullet.-->

  1. [Introduction](#introduction)  
     1. [Preview the Band Plans](#preview-the-band-plans)  
     1. [Supported Software](#supported-software)
     1. [Band Plan Instructions](#band-plan-instructions)  
         1. [Notation System](#notation-system)
         1. [Allocation Sources](#allocation-sources)
         1. [Color Legend](#color-legend)
         1. [What to Keep in Mind](#what-to-keep-in-mind)
      1. [Create Your Own Band Plan](#create-your-own-band-plan)
  1. [Installation Instructions](#installation)
     1. [SDR#](#installation)
     1. [SDR++](#sdr-1)
  1. [Further Resources](#further-resources)
     1. [U.S. Band Plan Listed Contents](#us-band-plan-contents)
     1. [International Band Plan Listed Contents](#international-band-plan-contents)  
     1. [Color Legend Listed](#color-legend-listed)
     1. [Other Useful Resources](#other-useful-resources)

<!--1.[Conversion Scripts]()-->
***

# Introduction
Does the default band plan for your SDR software not have enough detail for you? 
If the answer is yes, we felt the same way on [r/rtlsdr](https://reddit.com/r/rtlsdr) and [r/amateursatellites](https://reddit.com/r/amateursatellites). That's why I decided to create this repository, so the SDR community can contribute to and create idealized band plans. 

In this README file we will cover almost  everything you'll want to know. What's in the band plans, how to read them, which software you can use with them, and how to install them. 

<!-- Have you ever wondered what lays within the ocean of photons whose waves we all swim? -->

***

## Preview the Band Plans
<!-- This section shows examples -->
#### Sample Images
> *A section of the 137MHz region in SDR#*
<img src="https://i.imgur.com/t2JzvMe.jpg" width="3000"/>   

> *The New Orleans WEFAX on 4317.9kHz (USB) in SDR++*
<img src="https://i.imgur.com/GxEiHKo.jpg" width="3000"/> *(WEFAX in US version only.)*
  

#### Videos 
For a  different view of the band plans - here are  some old videos showing the initial band plan release. (Please, keep in mind these videos are old and a lot has been updated since then; I plan on making updated videos soon):

- [A scroll through the US plan in SDR#](https://youtu.be/Azj1fn24qsA)
- [A scroll through the International plan in SDR#](https://youtu.be/u709OSG_Abg)



#### For a List of Band Plan Contents
Due to the quantity of allocations the lists of contents are located at the end of this file. Here are links to jump to the [US band plan](#us-band-plan-contents) and the [international band plan](#international-band-plan-contents). 


***
## Supported Software
| Region/ Version  | SDR# | SDR++ |
|------------------|------|-------|
| USA              |🟩   | 🟨    |
| French           |🟪   | 🟧    |  
| International    |🟩   | 🟦    |
| Build Your Own   |🟩   | 🟧    |

<!-- Add SDRuno in future -->

Legend:  
🟪 Partial Band Plan
🟦 Add in Near Future  
🟩 Full Support  
🟨 Experimental Release  
🟧 Possible in The Future
<!--🟥 - No Plan to Support at This Time -->
<!--⬜ - 'As-is'/ Adapted From Other Works -->
<!--🔳🟫⬛ -->
***

## Band Plan Instructions
> Example image of CB allocations to be used as a reference.
<img src="https://i.imgur.com/rBUCJ0D.jpg" width="3000"/>

### Notation System
1. The vertical bar (' **|** ') denotes an edge of a larger allocation is on the edge of that banner. Upper or lower allocation edge is dependent on which side of the allocation's name the vertical bar (' **|** ') is on. _e.g. See reference image: CB| Ch.1 is lowest frequency edge and 40 (SSB)| CB is the highest frequency edge._

1. Channelized allocations may omitt the 'Ch.' (Channel) descripter within its allocation area when either the general allocation is large or individual channels are narrow (harder to read). _e.g. See reference image: CB not having 'Ch.' every channel._

1. Parentheses (' **( )** ') is used when clarification may be of help. e.g. _Television Ch.2 (VHF)_, _OrbComm Ch.1 (Downlink)_, _Public Safety (EMS/ Fire/ Police)_

### Allocation Sources
In the SDR# (XML) band plan file, usually every 25 lines allocations have sources comments listed below them. 
> Image of the allocations with the sources comments at the bottom (in the XML file).
<img src="https://i.imgur.com/gAqdyXx.png" width="3000"/>

##
SDR++ however, uses JSON which does not natively support commenting, therefore no self-documenting capability for citing sources. 
As a work around, the SDR# XML file here on github at **_US/SDR#/BandPlan.xml_** or your local copy of the XML file open in a code editor could be used as a reference. Alternatively, you can reference the sources folder. However, it is limited in sources to avoid any potential copyright issues.

### Color Legend
1. All allocation colors follow a color legend. You can refer to this color legend in the [Color Legend Listed](#color-legend-listed) section of this README or use the SDR# XML file. 
1. Channelized areas will have alternating individual channel colors similar in appearance but emphasize the different channels within the same general allocation. _e.g. CB example image shows odd channels are lighter and even channels are darker._



### What to Keep in Mind
  
When using these band plans, keep in mind:

- These band plans are a guide and many allocations cannot be guaranteed accurate everywhere. 
- Watch for interference, imaging, harmonics, and be aware of the limitations of your SDR. Signals can appear to be at frequencies they are not for various technical reasons.
- Secondary allocations and locally different allocations can be hard to confirm and may not always be publicly listed on online databases. 

***
## Create Your Own Band Plan

An SDR# XML band plan template is provided for experimentation and customization.  
It gives users anywhere the ability to assign a band plan to their regional or personal needs, which can then be shared with the greater SDR community if desired.  
It has a simple layout with nothing more than a basic structure that the writer can adhere to if they desire. Luckily XML is a simple language that can be easily learned by those even with little skill in programming.  
 
***
# Installation

### SDR#​

1. Open the SDR# 'bin' folder. e.g. _C:\SDRSharp\bin_
1. **_Make sure to make a copy of the old default band plan in case something doesn't work!_**

1. Download the repository ([**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip)) and extract the folder.

1. Navigate to the file you want (e.g. *SDR-Band-Plans-master>US>SDR#*), select the file named `BandPlan` then copy & paste or drag & drop the file into the SDR 'bin' folder.
1. If prompted to replace the old `BandPlan` file, say yes. _(Assuming you did make a copy of the old band plan file, you're prepared to undo this change if necessary.)_  

> <img src="https://i.imgur.com/RrgZ5Ki.png" width="3000"/>  **You can just drop it in the SDR# folder.** 
***

### SDR++
>***Currently in testing, this process may change in the future!***

**SDR++ takes a little more work, but still is easy enough:**

1. Locate the band plans folder in SDR++. example for windows: _sdrpp_windows_x64>res>bandplans_
1. Download the repository ([**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip)) and extract the folder.
1. Navigate to the file you want (e.g. *SDR-Band-Plans-master>US>SDR++*), then drag and drop the `usa-kn1e` JSON file into the SDR++ bandplans folder. _(So far, this would show the allocations if selected in SDR++, but there would be no color to the band plan banners.)_
<img src="https://i.imgur.com/ZwvncI3.jpg" width="3000"/>

1. Locate the `config` file in the main SDR++ folder. Example for windows: The _sdrpp_windows_x64>_  folder, you should see 'modules', 'recordings', & 'res' folders if in the right location.  _(If your SDR++ has not been ran before, run the program now so it can generate a config file.)_ 
**_Make sure to make a copy of the old default `config` file in case something doesn't work!_**
1. In the extracted Github repository folder, open the `Config BandColors Modification.txt` in a text/ code editor and copy all of the text in the file.
1. Open the SDR++ `config` file in a text/ code editor and paste the previously copied code between the `"bandColors": {` line and the `"amateur": "#FF0000FF",` line in that field. _(Make sure to keep the old code, maintain the code formatting, and check for missing or extra commas; only the last line in that field `"military": "#FFFF00FF"` should not have a comma after it.)_
> <img src="https://i.imgur.com/iWjZ6qo.jpg" width="3000"/> _'config' file contents before and after modification._  

8. Save any open files and open SDR++, if it looks like the sample images in this README then it's good to go!  


The strange hex format basically brute-force converts the color format used in SDR# to the color format used in SDR++. It was easier to adapt the XML file to JSON this way, but this will most likely be updated in the future.

***
# Further Resources

## Band Plan Contents

### US Band Plan Contents
**Contains, but is not limited to:**

#### Broadcast:
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television Channels 2 to 69 *Note: Some TV channels are no longer used for TV anymore.                                                               

#### Amateur:
2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m, 17m, 15m, 12m, 10m, 6m, 2m, 1.25m, 70cm, 33cm, 23cm, 13cm, 9cm, 5cm, 3cm   (w/ ARRL BPs)

#### Satellites:
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT, CDA, Telemetry, Command), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A, Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging), Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), SiriusXM Satellites, Milstar, NOAA-20/ JPSS (TDRSS, Telemetry, Command), SNPP (TDRSS, Telemetry, Command), Starlink(U/D), TRDS(U/D)    

#### ISM:
50m (6.7MHz), 22m (13.7MHz, inside HiFER), 10m (27MHz), 8m (40MHz), 70cm (433MHz) (Not ISM but Common Use Part 15), 33cm (900MHz), 13cm (2.5GHz)  

#### Time Signals:
20KHz Time Signal, WWVB, WWV (2.5, 5, 10, 15, 20, 25), CHU (3.33, 7.85, 14.670), JJY-40 (40 KHz)(Japan), RBU (66.66 KHz)(Russia), BPC (68.5 KHz)(China), DCF77 (77.5 kHz)(Germany), TDF (162 kHz)(France)   

#### Aeronautical:
ADSB 978, ADSB 1090, ACARS, Air Band VOR/ILS, Air Band Voice, Civilian Aircraft Distress/ Emergency (121.5 MHz)  

#### Marine:
2, 4, 6, 8, 12, 16, 18, 22, 25, and 156MHz (Marine VHF) (Marine 4MHz and Marine VHF are expanded to show channels), WEFAX (Boston, New Orleans, Port Reyes), (AIS), and Most Distress Frequencies  <!-- Welcome to an easter egg! Why won't Reese's put smaller peanut butter cups inside their bigger ones? I have emailed them, but they never give an answer.-->

#### Submarine Stations:
NWC (19.8 KHz)(Australia), NPM (21.4 KHz)(US), Jim Creek (NLK) (24.8 KHz)(US), NML (25.2 KHz)(US), NOV (26.9 KHz)(US), SHR (38 KHz)(Sweden), SAS/SRC (40.4 kHz)(Sweden), SAS2 (42.5 kHz)(Sweden), SAS3 (44.2 kHz)(Sweden), GYN2 GBR (81 kHz)(UK)                       


#### Miscellaneous:
CB, GMRS and FRS, NOAA (NWR), 800MHz Bands, Police/ Fire/ Ambulance/ Business (2m), Hydrogen Line, Industrial/Business Bands, Paging Bands, Railroad H.O.T and E.O.T. (Head and End of train Devices), 220MHz Control/ Telemetry

#### More:
The files also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.

***

<!-- ## French Band Plan Contents -->

### International Band Plan Contents
_Quick Author's Note about this band plan: It is impossible to compile a list that every country can agree on, so I went with what I thought would likely be the best choice. There also might be a few things missing from this list for a variety of reasons. It's generally just meant to have more than the default._

**Contains, but is not limited to:**

#### Broadcast:
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television (Generalized)

#### Amateur:
With (ARRL) Bandplans: 2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m  
Without Bandplans: 17m, 15m, 12m, 10m, 6m, 2m, 70cm, 23cm, 13cm   

#### Satellites:
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A,
Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging),
Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), SiriusXM Satellites,

#### ISM:
22m (13.5MHz, inside HiFER), 10m (27MHz), 8m (40MHz), 70cm (433MHz) (Europe, Africa, Russia), 33cm (902MHz) (Americas), 13cm (2.5GHz)   

#### Time Signals:
20KHz Time Signal, WWVB, Generalized 2.5, 5, 10, 15, 20, 25MHz

#### Aeronautical:
ADSB 978, ADSB 1090

#### Marine:
2, 4, 6, 8, 12, 16, 18, 22, 25, and 156MHz (Marine VHF) (Marine 4MHz and Marine VHF are expanded to show channels), WEFAX (Boston, New Orleans, Port Reyes), and Most Distress Frequencies

#### More:
The files also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.

***
### Color Legend Listed
**Note: SDR# and SDR++ use YRGB (Y is for transparency), so the following list will not be perfectly representative.**

- General colors are used when an allocation can be either of two similar allocation types. 
- 'Alt.' colors are the alternate colors used in channelized allocations. 
- If color overlay is not practical - 44DBFFEC <span style="background-color:#DBFFEC;color:#DBFFEC">Block</span> (Mintish White)


#### General Colors:

  - Distress and Calling (Personal Locator Beacons Service) - 50FF0091 <span style="background-color:#FF0091;color:#FF0091">Block</span>   (Pinkish Red)
  - Aeronautical/ Aviation - 505D88FF <span style="background-color:#5D88FF;color:#5D88FF">Block</span> (Light Blue)
  - Cellular Services (3G/4G/LTE) - 50FFE600 <span style="background-color:#FFE600;color:#FFE600">Block</span> (Gold)/ Advanced Wireless Service - 50FFEE4A <span style="background-color:#FFEE4A;color:#FFEE4A">Block</span> (Light Yellow)
  - Commercial Broadcast Stations - 5580C0C0 <span style="background-color:#80C0C0;color:#80C0C0">Block</span> (Darker Blue-Green)
  - Fixed Services - 40FF0077 <span style="background-color:#FF0077;color:#FF0077">Block</span> (Pinkish Red)
  - Government and Public Service - 5000FF89 <span style="background-color:#00FF89;color:#00FF89">Block</span> (Greener Mint)
  - ISM Bands - 44006179 <span style="background-color:#006179;color:#006179">Block</span> (Dark marine Blue)
  - Maritime - 55008080 <span style="background-color:#008080;color:#008080">Block</span> (Dark Blue-Green)/ Alt. is - 5500C9C9 <span style="background-color:#00C9C9;color:#00C9C9">Block</span> (Lighter Blue-Green)
  - Military Air, 1432 - 1435 MHz Band - 5090EE90 <span style="background-color:#90EE90;color:#90EE90">Block</span> (Light Green, Military Default)
  - Military Sat - 50C2F542 <span style="background-color:#C2F542;color:#C2F542">Block</span> (Greenish Yellow)
  - Navigation (Radiolocation, Radionavigation): 5500FF7F <span style="background-color:#00FF7F;color:#00FF7F">Block</span> (Light Green)  (Non-GPS type)
  - Number Station/ Secret - 50DD1111 <span style="background-color:#DD1111 ;color:#DD1111 ">Block</span> (Dark Red)
  - Power Line Carrier (PLC) Systems - 40BAFD00 <span style="background-color:#BAFD00;color:#BAFD00">Block</span> (Slight Green Yellow)
  - Radar - 5004B704 <span style="background-color:#04B704;color:#04B704">Block</span> (Dark Green)
  - Radio Astronomy - 40FFFF00 <span style="background-color:#FFFF00;color:#FFFF00">Block</span> (Yellow)
  - Satellites: 5500FFFF <span style="background-color:#00FFFF;color:#00FFFF">Block</span> (Aqua)
  - Submarine Communications/ Unallocated (0 - 9KHz) - 40FFFFFF <span style="background-color:#FFFFFF;color:#FFFFFF">Block</span> (Light White)
  - Submarine Stations - 5580C0C0 <span style="background-color:#80C0C0;color:#80C0C0">Block</span> (Darker Blue-Green)
  - (Buffer) - 00000000       (Transparent)
###
  - Longwave - 505347FF <span style="background-color:#5347FF;color:#5347FF">Block</span> (Light Blue)
  - Medium Wave - 505D63FF <span style="background-color:#5D63FF;color:#5D63FF">Block</span> (Light Blue)
  - Shortwave - 505D63FF <span style="background-color:#5D63FF;color:#5D63FF">Block</span> (Light Blue)
  - AM Radio - 33FF0000 <span style="background-color:#FF0000;color:#FF0000">Block</span> (Light Red)
  - FM Radio - 4000FF9A <span style="background-color:#00FF9A;color:#00FF9A">Block</span> (Mint)
  - TV - 50FFE55C <span style="background-color:#FFE55C;color:#FFE55C">Block</span> (Tan)
  - ADSB/ ACARS  - 400000FF <span style="background-color:#0000FF;color:#0000FF">Block</span> (Light Blue)
  - Air Band Voice/ (VOR/ILS) - 505D88FF <span style="background-color:#5D88FF;color:#5D88FF">Block</span> (Light Blue)
  - CB - 77FF7777 <span style="background-color:#FF7777;color:#FF7777">Block</span> (Whitish Red), Alt is 77FF5858 <span style="background-color:#FF5858;color:#FF5858">Block</span> (Darker Whitish Red), R/C is 77ADFF7D <span style="background-color:#ADFF7D;color:#ADFF7D">Block</span> (Whitish Green)
  - PMR446 - 554545FF <span style="background-color:#4545FF;color:#4545FF">Block</span> (Darkish Blue), Alt. is 552929FF <span style="background-color:#2929FF;color:#2929FF">Block</span> (Darker Blue) 
  - Common Use Part 15 Bands: 44006179 <span style="background-color:#006179;color:#006179">Block</span> (Dark marine Blue)
  - GMRS, FRS, MURS - 40BAFD00 <span style="background-color:#BAFD00;color:#BAFD00">Block</span> (Slight Green Yellow)  Alt. is - 40BBE100 <span style="background-color:#BBE100;color:#BBE100">Block</span> (Darker Green Yellow)
  - NOAA Radio and EMWIN - 5000CED1 <span style="background-color:#00CED1;color:#00CED1">Block</span> (Dark Cyan)
  - Time Stations - 44FF00FF <span style="background-color:#FF00FF;color:#FF00FF">Block</span> (Magenta)
  - WEFAX - 5500FF91 <span style="background-color:#00FF91;color:#00FF91">Block</span> (Greener Mint)
###

  - Band Services - 40FF0077 <span style="background-color:#FF0077;color:#FF0077">Block</span> (Pinkish Red)
  - Cable Antenna Relay Service/ the Local Television Transmission Service/ Broadcast Microwave - 50FFBC00 <span style="background-color:#FFBC00;color:#FFBC00">Block</span> (Orange)
  - Disaster/Long Distance Communications - 50B00B68 <span style="background-color:#B00B68 ;color:#B00B68 ">Block</span>(Dark Magenta)
  - H.O.T./ DPU /E.O.T. - 5091FF00 <span style="background-color:#91FF00;color:#91FF00">Block</span> (Yellow-Green)
  - Industrial/Business - 5089FF00 <span style="background-color:#89FF00;color:#89FF00">Block</span> (Yellow-Green)
  - Lightning Detection Systems - 5500C9C9 <span style="background-color:#00C9C9;color:#00C9C9">Block</span> (Lighter Blue-Green)
  - Medical Device Radiocommunication Service, Telemetry, Medical, RFID, Military Systems - 507676FF <span style="background-color:#7676FF;color:#7676FF">Block</span> (Whiteish Blue)
  - Multiple Address Service (MAS) - 50FF9A00 <span style="background-color:#FF9A00;color:#FF9A00">Block</span> (Dark Orange)
  - Paging and Radiotelephone - 50FFCE83 <span style="background-color:#FFCE83;color:#FFCE83">Block</span> (Whitish Orange)
  - Personal Communications - 401A00FF <span style="background-color:#1A00FF;color:#1A00FF">Block</span> (Dark Blue)
  - Police/ Fire/ Ambulance/ Business - 50D00098 <span style="background-color:#D00098;color:#D00098">Block</span> (Dark Magenta)
  - Private Land Mobile - 55008080 <span style="background-color:#008080;color:#008080">Block</span> (Dark Blue-Green)/ Alt. is - 5500C9C9 <span style="background-color:#00C9C9;color:#00C9C9">Block</span> (Lighter Blue-Green) (Same as Marine)
  - RailRoad - 50FFD500 <span style="background-color:#FFD500;color:#FFD500">Block</span> (Yellow-Orange)
  - Telemetry (General) - 5091FF00 <span style="background-color:#91FF00;color:#91FF00">Block</span> (Yellow-Green)
  - WiFi - 44006179 <span style="background-color:#006179;color:#006179">Block</span> (Dark Turquoise)/  Alt. is - 44009980 <span style="background-color:#009980;color:#009980">Block</span> (Greener Blue-Green)



#### Satellites:

  - NOAA - 5500FFFF <span style="background-color:#00FFFF;color:#00FFFF">Block</span> (Aqua)
  - NOAA Command - 2200BFFF <span style="background-color:#00BFFF;color:#00BFFF">Block</span> (Darker Aqua)
  - NOAA HRPT - 557AFFFF <span style="background-color:#7AFFFF;color:#7AFFFF">Block</span> (Whitish Auqa)
  - NOAA DSB - 44FF00FF <span style="background-color:#FF00FF;color:#FF00FF">Block</span> (Magenta)
####
  - GOES - 5500FFFF <span style="background-color:#00FFFF;color:#00FFFF">Block</span> (Aqua)
####
  - METEOR - 2200BFFF <span style="background-color:#00BFFF;color:#00BFFF">Block</span> (Darker Aqua)
  - METEOR HRPT - 555CBABA <span style="background-color:#5CBABA;color:#5CBABA">Block</span> (Dark Aqua)
####
  - OrbComm Downlink - 33FF4400 <span style="background-color:#FF4400;color:#FF4400">Block</span> (Dark Orange)/ Alt. is - 33FF713D <span style="background-color:#FF713D;color:#FF713D">Block</span> (Slightly Lighter Dark Orange)
  - OrbComm Uplink - 33EBC334 <span style="background-color:#EBC334;color:#EBC334">Block</span> (Gold)/ Alt. is - 33FFC800 <span style="background-color:#FFC800;color:#FFC800">Block</span> (Orange)
  - OrbComm Gateway - 55FF8000 <span style="background-color:#FF8000;color:#FF8000">Block</span> (Light Orange)
  - SpaceBees Downlink - 55008CFF <span style="background-color:#008CFF;color:#008CFF">Block</span> (Dark Cyan)
  - SpaceBees Uplink - 55AE57FF <span style="background-color:#AE57FF;color:#AE57FF">Block</span> (Light Purple)
####
  - FY-3n HRPT - 55FFBA2E <span style="background-color:#FFBA2E;color:#FFBA2E">Block</span> (Light Orange)
  - METOP HRPT - 55F07070 <span style="background-color:#F07070;color:#F07070">Block</span> (Light Red)
####
  - GPS, GALILEO, GLONASS -  (Yellow <span style="background-color:Yellow;color:Yellow">Block</span>, Blue <span style="background-color:Blue;color:Blue">Block</span>, and Orange <span style="background-color:Orange;color:Orange">Block</span> respectively.)
  - Iridium - 33FF672F <span style="background-color:#FF672F;color:#FF672F">Block</span> (Orange)
  - Iridium Access Band/ Simplex Channels- 55FF672F <span style="background-color:#FF672F;color:#FF672F">Block</span> (Orange)
  - Inmarsat - 33FF4400 <span style="background-color:#FF4400;color:#FF4400">Block</span> (Dark Orange)
####
  - Deep Space Network Uplink - 55FFEF85 <span style="background-color:#FFEF85;color:#FFEF85">Block</span>/ Alt. is - 55FFE430 <span style="background-color:#FFE430;color:#FFE430">Block</span>
  - Deep Space Network Downlink - 556B95FF <span style="background-color:#6B95FF;color:#6B95FF">Block</span>/ Alt is - 55366FFF <span style="background-color:#366FFF;color:#366FFF">Block</span>
####
  - ComSatBw - 506B6A8A <span style="background-color:#6B6A8A;color:#6B6A8A">Block</span> (Gray)
  - Milstar - 50C2F5AA  <span style="background-color:#C2F5AA ;color:#C2F5AA ">Block</span> (whitish green)
  - SDS, SICRAL, Skynet, - 50F5D3AA <span style="background-color:#F5D3AA;color:#F5D3AA">Block</span> (Whitish orange)
  - UFO, FLTSATCOM8: 50ABAAF5 (Whitish Blue) <span style="background-color:#ABAAF5;color:#ABAAF5">Block</span> Alt. is 50CCAAFF <span style="background-color:#CCAAFF;color:#CCAAFF">Block</span> (Whitish Purple)
####
  - DCS/ DCP control or Satellite Control - 5091A4EE <span style="background-color:#91A4EE;color:#91A4EE">Block</span> (Whitish Blue)
  - DCS/ DCP or Satellite Uplinking - 55C4FF00 <span style="background-color:#C4FF00;color:#C4FF00">Block</span> (Gold)
  - Earth Exploration-Satellite, and Space Research Services - 5091A4EE <span style="background-color:#91A4EE;color:#91A4EE">Block</span> (Whitish Blue)
  - General Space Communications E-S, S-S, S-E - 553AFFFF <span style="background-color:#3AFFFF;color:#3AFFFF">Block</span> (Slightly White Aqua)
  - General or Government Use Meteorological-Satellite Service - 50738FFF <span style="background-color:#738FFF;color:#738FFF">Block</span> (Light Blue)
  - Meassaging Satellites Default/ Mobile Satellite Service (MSS) - 40FFCD00 <span style="background-color:#FFCD00;color:#FFCD00">Block</span> (Light Orange)
  - Radionavigation Satellite Service - 4089FF00 <span style="background-color:#89FF00;color:#89FF00">Block</span> (Yellow Green)
  - Satellite Digital Audio Radio Service (SDARS) - 5000ABFF <span style="background-color:#00ABFF;color:#00ABFF">Block</span> (Sky Blue)
  - SiriusXM Satellites - 40004DFF <span style="background-color:#004DFF;color:#004DFF">Block</span> (Dark Blue)
  - Standard Frequency and Beacon - 50DE91EE <span style="background-color:#DE91EE;color:#DE91EE">Block</span> (Lavender)



#### Ham:

  - Default/ Placeholders - 40FF0000 <span style="background-color:#FF0000;color:#FF0000">Block</span> (Red)
  - Satellite Downlinks - 5500E6FF <span style="background-color:#00E6FF;color:#00E6FF">Block</span> (Cyan)/  Alt.  Satellite Downlinks - 5500C6DB <span style="background-color:#00C6DB;color:#00C6DB">Block</span> (Darker Cyan)
  - Satellite Uplinks - 50FFFF00 <span style="background-color:#FFFF00;color:#FFFF00">Block</span> (Yellow)/  Alt. Satellite Uplinks - 50DDDD00 <span style="background-color:#DDDD00;color:#DDDD00">Block</span> (Darker Yellow)
  - Satellite (Up or Down) - 5033FF00 <span style="background-color:#33FF00;color:#33FF00">Block</span> (Yellow-Green)
  - ISS Voice Downlinks - 5500BCFF <span style="background-color:#00BCFF;color:#00BCFF">Block</span> (Sky Blue)
  - ISS Voice Uplink - 55C4FF00 <span style="background-color:#C4FF00;color:#C4FF00">Block</span> (Gold)
  - General ISS - 55C4FF00 <span style="background-color:#C4FF00;color:#C4FF00">Block</span> (Gold)
  - DX window, Phone, Broadband Modes, Wideband Gunnplexers - 40FF0000 <span style="background-color:#FF0000;color:#FF0000">Block</span> (Red)
  - APRS - 5000FFBF <span style="background-color:#00FFBF;color:#00FFBF">Block</span> (Light Mint)
  - ATV - 50FF0089 <span style="background-color:#FF0089;color:#FF0089">Block</span> (Pinkish Red)
  - Beacons Satellite/ Terrestrial - 50ACFFEC <span style="background-color:#ACFFEC;color:#ACFFEC">Block</span> (White Mint)
  - Calling Frequencies - 50FFB300 <span style="background-color:#FFB300;color:#FFB300">Block</span> (Orange)
  - Digital - 508000FF <span style="background-color:#8000FF;color:#8000FF">Block</span> (Purple)
  - EME - 5086FFFC <span style="background-color:#86FFFC;color:#86FFFC">Block</span> (Light Cyan)
  - Experimental - 503CCCFF <span style="background-color:#3CCCFF;color:#3CCCFF">Block</span> (Sky Blue)
  - FM Simplex, General Simplex - 503CFF00 <span style="background-color:#3CFF00;color:#3CFF00">Block</span> (Green)
  - General Linear Translator Output - 50FF578A <span style="background-color:#FF578A;color:#FF578A">Block</span> (Whitish Red)
  - Ham Paging Service - 50FFCE83 <span style="background-color:#FFCE83;color:#FFCE83">Block</span> (Whitish Orange)
  - Linear Translator Inputs - 50FF004D <span style="background-color:#FF004D;color:#FF004D">Block</span> (Pinkish Red)
  - Linear Translator Output - 50FF0000 <span style="background-color:#FF0000;color:#FF0000">Block</span> (Red)
  - Links/ control - 50FF009A <span style="background-color:#FF009A;color:#FF009A">Block</span> (Pinkish Red)
  - Mixed Mode, Analog/Digital - 40FF00BC <span style="background-color:#FF00BC;color:#FF00BC">Block</span> (Pink)
  - Packet - 5000B3FF <span style="background-color:#00B3FF;color:#00B3FF">Block</span> (Sky Blue)
  - RTTY/Data - 500089FF <span style="background-color:#0089FF;color:#0089FF">Block</span> (Dark Sky Blue)
  - Repeater I/O - 508000FF <span style="background-color:#8000FF;color:#8000FF">Block</span> (Purple)
  - Repeaters Inputs - 50FFFF00 <span style="background-color:#FFFF00;color:#FFFF00">Block</span> (Yellow)
  - Repeaters Outputs - 5089FF00 <span style="background-color:#89FF00;color:#89FF00">Block</span> (Yellow-Green)
  - SSTV - 50FF004D <span style="background-color:#FF004D;color:#FF004D">Block</span> (Pinkish Red)
  - Telegraphy - 50E9E9E9 <span style="background-color:#E9E9E9;color:#E9E9E9">Block</span> (Gray White)
  - Weak Signal - 507DDDFF <span style="background-color:#7DDDFF;color:#7DDDFF">Block</span> (Lighter Sky Blue)

***

# Other Useful Resources
1. [FCC Online Table of Frequency Allocations (Federal and Nonfederal, and ITU Regions 1, 2, & 3) PDF](https://transition.fcc.gov/oet/spectrum/table/fcctable.pdf)  
1. [FCC ID.io - A more User-Friendly Version of the 'FCC Table of Frequency Allocations' PDF](https://fccid.io/frequency-explorer.php?lower=100&upper=1000)  
1. [European Table of Frequency Allocations PDF](https://www.itu.int/ITU-D/study_groups/SGP_2002-2006/JGRES09/CEPT2.pdf)  
1. [IEEE Database of Frequency Allocations for all ITU Countries](http://www.grss-ieee.org/frequency_allocations.html)  
1. [RadioReference - Ubiquitous, but missing many niche allocations.](https://www.radioreference.com/)
1. [Signal ID Wiki - Ubiquitous, but also missing many niche allocations.](https://www.sigidwiki.com/wiki/Database)
1. [You can use an ATSC pilot carrier to calibrate your SDR. Using 'ATSC pilot' from these tables.](https://www.sigidwiki.com/wiki/ATSC_Broadcast#Frequencies)
1. [inSSIDer - A Program for Viewing the 2.4GHz and 5GHz WiFi Channels (Uses WiFi card)](https://www.metageek.com/inssider/)

