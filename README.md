<!-- -->
# Open-source Band Plans for SDR Software.

<img src="https://i.imgur.com/8GxX1oC.jpg" width="3000"/>  

> **_A section of the 137MHz region in SDR++_**
## 
#### Quick links:
- **[*\*Listed U.S. band plan contents*](#us-band-plan-contents)**
- **[*\*Listed International band plan contents*](#international-band-plan-contents)**

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
     1. [Gqrx](#gqrx)
  1. [Further Resources](#further-resources)
     1. [U.S. Band Plan Listed Contents](#us-band-plan-contents)
     1. [International Band Plan Listed Contents](#international-band-plan-contents)  
     1. [Color Legend Listed](#color-legend-listed)
     1. [Other Useful Resources](#other-useful-resources)

<!--1.[Conversion Scripts]()-->
***

# Introduction
Does the default band plan for your SDR software not have enough detail for you? 
If the answer is yes, we felt the same way on [r/rtlsdr](https://reddit.com/r/rtlsdr) and [r/amateursatellites](https://reddit.com/r/amateursatellites). That's why I decided to create this repository, so the SDR community can construct idealized band plans. 

In this README file we will cover almost  everything you'll want to know. What's in the band plans, how to read them, which software you can use with them, and how to install them. 

<!-- Have you ever wondered what lays within the ocean of photons whose waves we all swim? -->

***

## Preview the Band Plans
<!-- This section shows examples -->

#### Sample Images

<img src="https://i.imgur.com/t2JzvMe.jpg" width="3000"/>   

> *A section of the 137MHz region in SDR#*

<img src="https://i.imgur.com/GxEiHKo.jpg" width="3000"/>  

> *The New Orleans WEFAX on 4317.9kHz (USB) in SDR++ (WEFAX in US version only.)*

<img src="https://i.imgur.com/ONeUzXs.png" width="3000"/>  

> *A local pager on 454.325MHz in Gqrx*
  

#### Videos 
For a  different view of the band plans - here are  some old videos showing the initial band plan release. (Please, keep in mind these videos are old and a lot has been updated since then; I plan on making updated videos soon):

- [A scroll through the US plan in SDR#](https://youtu.be/Azj1fn24qsA)
- [A scroll through the International plan in SDR#](https://youtu.be/u709OSG_Abg)



#### For a List of Band Plan Contents
Due to the quantity of allocations the lists of contents are located at the end of this file. Here are links to jump to the [US band plan](#us-band-plan-contents) and the [international band plan](#international-band-plan-contents). 


***
## Supported Software
| Region/ Version  | SDR# | SDR++ | Gqrx |
|------------------|------|-------|------|
| USA              |🟩   | 🟩    |🟩    |
| French           |🟩   | 🟧    |🟩    |
| International    |🟩   | 🟦    |🟩    |
| Build Your Own   |🟩   | 🟧    |🟧    |

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
> Example CB allocations reference image.
<img src="https://i.imgur.com/rBUCJ0D.jpg" width="500"/>

### Notation System
1. The vertical bar (' **|** ') denotes an edge of a larger allocation is on the edge of that banner. Upper or lower allocation edge is dependent on which side of the allocation's name the vertical bar (' **|** ') is on. _e.g. **See CB reference image**: CB| Ch.1 is lowest frequency edge and 40 (SSB)| CB is the highest frequency edge._ 
This method is also used to show nested allocations. _e.g. At 137.1MHz shared center allocations - NOAA-19 (40kHz wide), inside METEOR (120kHz wide), inside SpaceBees (150kHz wide) allocations._

1. Channelized allocations may omitt the 'Ch.' (Channel) descripter within its allocation area when either the general allocation is large and can be colored distinctly from neighboring allocations or individual channels are narrow or harder to read. _e.g. **See CB reference image**: CB channels not showing 'Ch.' in any channel but 1._

1. Parentheses (' **( )** ') is used when clarification may be of help. e.g. _Television Ch.2 (VHF)_, _OrbComm Ch.1 (Downlink)_, _Public Safety (EMS/ Fire/ Police)_

### Allocation Sources
In the SDR# (XML) band plan file, usually every 25 lines allocations have sources comments listed below them. 

<img src="https://i.imgur.com/gAqdyXx.png" width="3000"/>

> Image of allocations with sources comments below them (in the XML file).

##
SDR++ however, uses JSON which does not natively support commenting, therefore no self-documenting capability for citing sources. 
As a workaround, the SDR# XML file here on github at **_US/SDR#/BandPlan.xml_** or your local copy of the XML file open in a code editor could be used as a reference. Alternatively, you can reference the sources folder. However, it is limited in sources to avoid any potential copyright issues.

Gqrx does not list source comments yet, so for now, follow the same workaround as SDR++. This should not be a problem as all band plans should have the same allocations.  

### Color Legend
1. All allocation colors follow a color legend. You can refer to this color legend in the [Color Legend Listed](#color-legend-listed) section of this README or use the SDR# XML file. 
1. Channelized areas will have alternating individual channel colors similar in appearance but emphasize the different channels within the same general allocation. _e.g. **See CB reference image**: shows odd channels are lighter and even channels are darker._



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
1. Navigate to the file you want (e.g. *SDR-Band-Plans-master/US/SDR#*), select the file named `BandPlan` then copy & paste or drag & drop the file into the SDR 'bin' folder. (Ensure that SDR# is not running, otherwise the BandPlan.xml file will be overwritten with original data when exiting.)
1. If prompted to replace the old `BandPlan` file, say yes. _(Assuming you did make a copy of the old band plan file, you're prepared to undo this change if necessary.)_  

<img src="https://i.imgur.com/RrgZ5Ki.png" width="3000"/>  

> **You can just drop it in the SDR# folder.** 
***

### SDR++
>***Currently in testing, this process may change in the future!***

**SDR++ takes a little more work, but still is easy enough:**

1. Locate the band plans folder in SDR++. example for windows: _sdrpp_windows_x64/res/bandplans_
2. Download the repository ([**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip)) and extract the folder.
3. Navigate to the file you want (e.g. *SDR-Band-Plans-master/US/SDR++*), then drag and drop the `usa-kn1e` JSON file into the SDR++ bandplans folder. _(So far, this would show the allocations if selected in SDR++, but there would be no color to the band plan banners.)_
<img src="https://i.imgur.com/ZwvncI3.jpg" width="3000"/>

4. Locate the `config` file in the main SDR++ folder. Example for windows: The _sdrpp_windows_x64>_  folder, you should see 'modules', 'recordings', & 'res' folders if in the right location.  _(If your SDR++ has not been ran before, run the program now so it can generate a config file.)_ 
**_Make sure to make a copy of the old default config file in case something doesn't work!_**
5. In the extracted Github repository folder, open the `Config BandColors Modification.txt` in a text/ code editor and copy all of the text in the file.
6. Open the SDR++ `config` file in a text/ code editor and paste the previously copied code between the `"bandColors": {` line and the `"amateur": "#FF0000FF",` line in that field. _(Make sure to keep the old code, maintain the code formatting, and check for missing or extra commas; only the last line in that field `"military": "#FFFF00FF"` should not have a comma after it.)_

<img src="https://i.imgur.com/iWjZ6qo.jpg" width="3000"/> 

> _'config' file contents before and after modification._  

7. Save any open files and open SDR++, if it looks like the sample images in this README then it's good to go!  


The strange hex format basically brute-force converts the color format used in SDR# to the color format used in SDR++. It was easier to adapt the XML file to JSON this way, but this will most likely be updated in the future.

***


### Gqrx

1. Locate the folder where Gqrx _bandplan.csv_ is located. Example for Raspberry Pi OS: _home/user/.config/gqrx_
2. Download the repository ([**Click Here** to download the ZIP file](https://github.com/Arrin-KN1E/SDR-Band-Plans/archive/refs/heads/master.zip)) and extract the folder.
3. Navigate to the file you want (e.g. *SDR-Band-Plans-master/US/Gqrx*), then drag and drop the `bandplan.csv` file into the Gqrx folder. _(Make sure to make a backup of the original bandplan.csv. Also, if you see no files in the folder, run Gqrx at least once)_.

<img src="https://i.imgur.com/iZd9KRc.png" width="3000"/>

> _Copy and replace of bandplan.csv_


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
2, 4, 6, 8, 12, 16, 18, 22, 25, and 156MHz (Marine VHF) (Marine 4MHz and Marine VHF are expanded to show channels), WEFAX (Boston, New Orleans, Port Reyes), (AIS), and Most Distress Frequencies  <!-- Why doesn't Reese's put smaller peanut butter cups inside their bigger ones? -->

#### Submarine Stations:
NWC (19.8 KHz)(Australia), NPM (21.4 KHz)(US), Jim Creek (NLK) (24.8 KHz)(US), NML (25.2 KHz)(US), NOV (26.9 KHz)(US), SHR (38 KHz)(Sweden), SAS/SRC (40.4 kHz)(Sweden), SAS2 (42.5 kHz)(Sweden), SAS3 (44.2 kHz)(Sweden), GYN2 GBR (81 kHz)(UK)                       


#### Miscellaneous:
CB, GMRS and FRS, NOAA (NWR), 800MHz Bands, Police/ Fire/ Ambulance/ Business (2m), Hydrogen Line, Industrial/Business Bands, Paging Bands, Railroad H.O.T and E.O.T. (Head and End of train Devices), 220MHz Control/ Telemetry

#### More:
The XML file also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.

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
**Note: SDR# and SDR++ use YRGB (Y for transparency), colors cannot be rendered in this readme, so the following list will not be perfectly descriptive and should be used as a reference.**

- General colors are used when an allocation can be either of two similar allocation types. 
- 'Alt.' colors are the alternate colors used in channelized allocations. 
- If color overlay is not practical - #44DBFFEC (Mintish White)


#### General Colors:
  - Distress and Calling (Personal Locator Beacons Service) - #50FF0091  (Pinkish Red)
  - Aeronautical/ Aviation - #505D88FF  (Light Blue)
  - Cellular Services (3G/4G/LTE) - #50FFE600  (Gold)/ Advanced Wireless Service - #50FFEE4A  (Light Yellow)
  - Commercial Broadcast Stations - #5580C0C0  (Darker Blue-Green)
  - Fixed Services - #40FF0077  (Pinkish Red)
  - Government and Public Service - #5000FF89  (Greener Mint)
  - ISM Bands - #44006179  (Dark marine Blue)
  - Maritime - #55008080  (Dark Blue-Green)/ Alt. is - #5500C9C9 (Lighter Blue-Green)
  - Military Air, 1432 - 1435 MHz Band - #5090EE90  (Light Green, Military Default)
  - Military Sat - #50C2F542  (Greenish Yellow)
  - Navigation (Radiolocation, Radionavigation): #5500FF7F  (Light Green)  (Non-GPS type)
  - Number Station/ Secret - #50DD1111 (Dark Red)
  - Power Line Carrier (PLC) Systems - #40BAFD00  (Slight Green Yellow)
  - Radar - #5004B704  (Dark Green)
  - Radio Astronomy - #40FFFF00  (Yellow)
  - Satellites: #5500FFFF  (Aqua)
  - Submarine Communications/ Unallocated (0 - 9KHz) - #40FFFFFF  (Light White)
  - Submarine Stations - #5580C0C0  (Darker Blue-Green)
  - (Buffer) - #00000000  (Empty)
###
  - Longwave - #505347FF  (Light Blue)
  - Medium Wave - #505D63FF  (Light Blue)
  - Shortwave - #505D63FF  (Light Blue)
  - AM Radio - #33FF0000  (Light Red)
  - FM Radio - #4000FF9A  (Mint)
  - TV - #50FFE55C  (Tan)
  - ADSB/ ACARS  - #400000FF  (Light Blue)
  - Air Band Voice/ (VOR/ILS) - #505D88FF  (Light Blue)
  - CB - #77FF7777 (Whitish Red), Alt is #77FF5858 (Darker Whitish Red), R/C is #77ADFF7D (Whitish Green)
  - PMR446 - #554545FF (Darkish Blue), Alt. is #552929FF (Darker Blue) [Not used in US, but kept for reference]
  - Common Use Part 15 Bands: #44006179   (Dark marine Blue)
  - GMRS, FRS, MURS - #40BAFD00  (Slight Green Yellow)  Alt. is - #40BBE100 (Darker Green Yellow)
  - NOAA Radio and EMWIN - #5000CED1  (Dark Cyan)
  - Time Stations - #44FF00FF  (Magenta)
  - WEFAX - #5500FF91   (Greener Mint)
###
  - Band Services - #40FF0077  (Pinkish Red)
  - Cable Antenna Relay Service/ the Local Television Transmission Service/ Broadcast Microwave - #50FFBC00  (Orange)
  - Disaster/Long Distance Communications - #50B00B68 (Dark Magenta)
  - H.O.T./ DPU /E.O.T. - #5091FF00 (Yellow-Green)
  - Industrial/Business - #5089FF00 (Yellow-Green)
  - Lightning Detection Systems - #5500C9C9 (Lighter Blue-Green)
  - Medical Device Radiocommunication Service, Telemetry, Medical, RFID, Military Systems - #507676FF  (Whiteish Blue)
  - Multiple Address Service (MAS) - #50FF9A00  (Dark Orange)
  - Paging and Radiotelephone - #50FFCE83 (Whitish Orange)
  - Personal Communications - #401A00FF (Dark Blue)
  - Police/ Fire/ Ambulance/ Business - #50D00098  (Dark Magenta)
  - Private Land Mobile - #55008080  (Dark Blue-Green)/ Alt. is - #5500C9C9 (Lighter Blue-Green) (Same as Marine)
  - RailRoad - #50FFD500 (Yellow-Orange)
  - Telemetry (General) - #5091FF00 (Yellow-Green)
  - WiFi - #44006179 (Dark Turquoise)/  Alt. is - #44009980 (Greener Blue-Green)
###
#### Satellites:
  - NOAA - #5500FFFF  (Aqua)
  - NOAA Command - #2200BFFF  (Darker Aqua)
  - NOAA HRPT - #557AFFFF  (Whitish Auqa)
  - NOAA DSB - #44FF00FF  (Magenta)
###
  - GOES - #5500FFFF  (Aqua)
###
  - METEOR - #2200BFFF  (Darker Aqua)
  - METEOR HRPT - #555CBABA  (Dark Aqua)
###
  - OrbComm Downlink - #33FF4400  (Dark Orange)/ Alt. is - #33FF713D (Slightly Lighter Dark Orange)
  - OrbComm Uplink - #33EBC334  (Gold)/ Alt. is - #33FFC800 (Orange)
  - OrbComm Gateway - #55FF8000  (Light Orange)
  - SpaceBees Downlink - #55008CFF  (Dark Cyan)
  - SpaceBees Uplink - #55AE57FF  (Light Purple)
###
  - FY-3n HRPT - #55FFBA2E  (Light Orange)
  - METOP HRPT - #55F07070  (Light Red)
###
  - GPS, GALILEO, GLONASS -  (Yellow, Blue, Orange)
  - Iridium - #33FF672F   (Orange)
  - Iridium Access Band/ Simplex Channels- #55FF672F   (Orange)
  - Inmarsat - #33FF4400  (Dark Orange)
###
  - Deep Space Network Uplink - #55FFEF85/ Alt. is - #55FFE430
  - Deep Space Network Downlink - #556B95FF/ Alt is - #55366FFF
###
  - ComSatBw - #506B6A8A (Gray)
  - Milstar - #50C2F5AA (whitish green)
  - SDS, SICRAL, Skynet, - #50F5D3AA (Whitish orange)
  - UFO, FLTSATCOM8: #50ABAAF5 (Whitish Blue)  Alt. is #50CCAAFF (Whitish Purple)
###
  - DCS/ DCP control or Satellite Control - #5091A4EE  (Whitish Blue)
  - DCS/ DCP or Satellite Uplinking - #55C4FF00  (Gold)
  - Earth Exploration-Satellite, and Space Research Services - #5091A4EE  (Whitish Blue)
  - General Space Communications E-S, S-S, S-E - #553AFFFF  (Slightly White Aqua)
  - General or Government Use Meteorological-Satellite Service - #50738FFF  (Light Blue)
  - Meassaging Satellites Default/ Mobile Satellite Service (MSS) - #40FFCD00  (Light Orange)
  - Radionavigation Satellite Service - #4089FF00  (Yellow Green)
  - Satellite Digital Audio Radio Service (SDARS) - #5000ABFF  (Sky Blue)
  - SiriusXM Satellites - #40004DFF (Dark Blue)
  - Standard Frequency and Beacon - #50DE91EE  (Lavender)
###
#### Ham:
  - Default/ Placeholders - #40FF0000 (Red)
  - Satellite Downlinks - #5500E6FF  (Cyan)/  Alt. Satellite Downlinks - #5500C6DB  (Darker Cyan)
  - Satellite Uplinks - #50FFFF00  (Yellow)/  Alt. Satellite Uplinks - #50DDDD00  (Darker Yellow)
  - Satellite (Up or Down) - #5033FF00  (Yellow-Green)
  - ISS Voice Downlinks - #5500BCFF  (Sky Blue)
  - ISS Voice Uplink - #55C4FF00  (Gold)
  - General ISS - #55C4FF00  (Gold)
  - DX window, Phone, Broadband Modes, Wideband Gunnplexers - #40FF0000  (Red)
  - APRS - #5000FFBF  (Light Mint)
  - ATV - #50FF0089  (Pinkish Red)
  - Beacons Satellite/ Terrestrial - #50ACFFEC  (White Mint)
  - Calling Frequencies - #50FFB300  (Orange)
  - Digital - #508000FF  (Purple)
  - EME - #5086FFFC  (Light Cyan)
  - Experimental - #503CCCFF  (Sky Blue)
  - FM Simplex, General Simplex - #503CFF00  (Green)
  - General Linear Translator Output - #50FF578A  (Whitish Red)
  - Ham Paging Service - #50FFCE83  (Whitish Orange)
  - Linear Translator Inputs - #50FF004D  (Pinkish Red)
  - Linear Translator Output - #50FF0000  (Red)
  - Links/ control - #50FF009A  (Pinkish Red)
  - Mixed Mode, Analog/Digital - #40FF00BC  (Pink)
  - Packet - #5000B3FF  (Sky Blue)
  - RTTY/Data - #500089FF  (Dark Sky Blue)
  - Repeater I/O - #508000FF  (Purple)
  - Repeaters Inputs - #50FFFF00  (Yellow)
  - Repeaters Outputs - #5089FF00  (Yellow-Green)
  - SSTV - #50FF004D  (Pinkish Red)
  - Telegraphy - #50E9E9E9  (Gray White)
  - Weak Signal - #507DDDFF  (Lighter Sky Blue)

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

