# Band plans for SDRsharp

Expanded band plan file for SDR#.

## Download Links

[US BandPlan XML](https://raw.githubusercontent.com/Arrin-KN1E/SDRsharpbandplans/master/US/BandPlan.xml)  
International BandPlan coming soon.

## Installing
It's as easy as dropping it in the SDR# folder. Just make sure to have a backup of the old default bandplan in case something doesn't work! For anyone that needs to see it, [here](https://youtu.be/0OqyOx87hJk) is a super simple video on how to install the XML file.

## Backstory
Hello everyone! A while back a few users and I on [r/rtlsdr](https://reddit.com/r/rtlsdr) and [r/amateursatellites](https://reddit.com/r/amateursatellites) discussed the creation of a better bandplan for SDR#. It was my desire to make a decently detailed bandplan for where I live (the US) that could then be used as a framework so people in other countries or regions could change the allocations to their needs. With enough country and regional bandplans we could possibly have a community of bandplans that users could choose from. So, this is my attempt at starting that project. I've made the US bandplan, and as to not leave non-US users without something I threw together a basic International bandplan. I didn't know where the best place to have all other community made plans stored at would be (Github? idk), so I'll let the community/mods decide on that. But, I should get to the plans.

If you want to see videos of them and get motion sick at the same time here is US plan in SDR#, and here is a scroll through the code.  I also have the International plan in SDR#,and of course a video of the code too. The videos have no audio! They are for previewing purposes only! So, they're nothing special.

I should start off by saying I'm not a programmer and I did this by myself. So, there are going to be mistakes and I don't know everything about every allocation so there might be a setting wrong here and there. So, I greatly apologize for any mistakes in either of the plans. Now, to get start getting into the technical details!

I used the FCC Online Table of Frequency Allocations Table as a general allocations guide. I used what I knew to fill in the details. Since I live in the US I know US frequencies decently well, so it was pretty easy to fill in the details. For international frequencies I know almost nothing so I tried to play it safe on the International plan and using what I think most of the world uses. I made it quick and I hope it can be replaced by a community bandplan relativly quickly. So, I know I made amistakes in the International plan I just don't know where. Even so, the bandplans are meant to be more of a foundation to be built upon and a proposed structure than being the be all end all. That's why I didn't make a simple US version (The International plan basically is anyway) or make ITU regions 1, 2, or 3 plans.


## Band Plan Contains
The US plan contains, among many other things not listed:

### Broadcast
AM Radio, FM Radio, Long Wave, Medium Wave (212m), Shortwave (Tropical Band 120m), Shortwave (Tropical Band 90m), Shortwave (75m), Shortwave (Tropical Band 60m), Shortwave (49m), Sortwave (41m), Shortwave (31m), Shortwave (25m), Shortwave (22m), Shortwave (19m), Shortwave (16m), Shortwave (15m), Shortwave (13m), Shortwave (11m), Television Channels 2 to 69 Note: Some TV channels are no longer used for TV anymore.  

### HAM
2200m, 1750m (LowFER), 630m, 160m, 80m, 60m, 40m, 30m, 22m (HiFER), 20m, 17m, 15m, 12m, 10m, 6m, 2m, 1.25m, 70cm, 33cm, 23cm, 13cm   (w/ ARRL BPs) 

### Satellites
NOAA-15, NOAA-18, NOAA-19 (NOAAs DSB, DCS, APT, HRPT), METEOR M2 (LRPT, AHRPT), METEOR M2-2 (AHRPT), Orbcomm (Uplink and Downlink), GOES-16, GOES-17 (HRIT, GRB, DCP), Metop-A, 
Metop-B, Metop-C (Metops AHRPT, DCP) Feng-Yun-3A, Feng-Yun-3B, Feng-Yun-3C (CHRPT), GPS (L5, L2, L1), GALILEO (E5a, E1, SAR Downlink), GLONASS (G1, G2, G3), Iridium (General, Ring, Alert, Messaging), 
Inmarsat (General Only), ISS (Voice U/D, SSTV, VHF Packet U/D, U/V Repeater Uplink, ISS UHF Packet U/D, ISS U/V Repeater Downlink), AO-85 (U/D), AO-91 (U/D), AO-92 (U/D), SO-50 (U/D), PO-101 (U/D), 
SiriusXM Satellites  

### ISM
50m (67MHz), 22m (13.7MHz, inside HiFER), 10m (27MHz), 8m (40MHz), 4m (84MHz), 2m (168MHz), 70cm (433MHz), 33cm (900MHz), 13cm (2.5GHz)  

### Time Signals
20KHz Time Signal, WWVB, WWV (2.5, 5, 10, 15, 20, 25), CHU (3.33, 7.85, 14.670)  

### Aeronautical
ADSB 978, ADSB 1090, ACARS, Air Band VOR/ILS, Air Band Voice, Civilian Aircraft Distress/ Emergency (121.5 MHz)  

### Marine
Distress (2, 4, 6, 8, 12, 16, 156 (VHF) MHz) (Marine 4MHz and Marine VHF are expanded), WEFAX (Boston, New Orleans, Port Reyes)  

### Miscellaneous
CB, GMRS and FRS, NOAA (NWR), 800MHz Bands, Police/ Fire/ Ambulance/ Business (2m), Hydrogen Line, Industrial/Business Bands, Paging Bands, Railroad H.O.T and E.O.T. (Head and End of train 
Devices)

### More
The files also contain a list of contents, reference, color legend, explanation on how you can customize the file, and my comments about the file, at the bottom under all of the allocations.
