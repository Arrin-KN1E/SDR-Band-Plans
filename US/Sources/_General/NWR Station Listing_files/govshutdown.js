(function() {
        if (false) { // disabled
                var message = 'Due to the Federal Government shutdown, NOAA.gov and most associated websites are unavailable. However, because the information this site provides is necessary to protect life and property, it will be updated and maintained during the Federal Government shutdown.';

                var impactFound = false;
                var impactList = 'about,careers,code88d,contentwidgets,developers,documentation,eclipse,eeo-diversity,evolve,floodsafety,hazardsimplification,hazcollect,impacts,international,iscs,jetstream,labor,mentalhealth,news,nl2,notification,npn,nwr,nwstc,observations,organization,owlie,people,photocontest,publications,ready,safety,skywarn,stormready,training,tsunamiready,upperair';
                var impactedSites = impactList.split(',');
                for (var x = 0; x < impactedSites.length; x++) {
                        if (window.location.pathname.search('/' + impactedSites[x] + '/') >= 0) {
                                impactFound = true;
                                break;
                        }
                }

                var banner = document.createElement('div');
                banner.style.padding = '20px';
                banner.style.fontSize = '16px';

                if (impactFound) {
                        message = 'Due to the Federal Government shutdown, NOAA.gov and most associated websites are unavailable. This site will remain accessible during the federal government shutdown; however, information on the site may not be up to date and we may not be able to respond to inquiries until appropriations are enacted.';
                        banner.style.backgroundColor = '#f00';
                        banner.style.color = '#fff';
                } else {
                        banner.style.backgroundColor = '#efefef';
                        banner.style.color = '#333';
                        banner.style.borderBottom = '1px dashed #aaa';
                }

                var bannerContent = document.createTextNode(message);
                banner.appendChild(bannerContent);
                document.body.insertBefore(banner, document.body.firstChild);
        }
})();


