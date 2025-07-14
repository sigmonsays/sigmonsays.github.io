---
date = "2015-01-05T10:38:37-07:00"
draft = false
title = "Google Owned"
tags = [ "google", "security", "misc" ]
_promo = [ "nopromo" ]

---

Ever think about how much information google has collected about you?

Apart from services there are additional things going on that you might not be aware of 

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Data Collection](#data-collection)
- [Location Services](#location-services)
- [Services](#services)
- [Photos](#photos)
- [Phone Sensors](#phone-sensors)
- [Degoogle Resources](#degoogle-resources)

<!-- markdown-toc end -->

# Data Collection

Data collected is often uploaded to google servers

- IMEI, hardware serial number, Wifi MAC address
- AndroidID, Google Ad ID

- [1] https://www.scss.tcd.ie/Doug.Leith/Android_privacy_report.pdf

# Location Services

In addition to GPS tracking, there is a service that runs on android phones and looks at available wifi networks to determine your location. This is usable when there isn't cell service.  However, the wifi networks are saved
and uploaded centrally to google. Nobody knows what and how this data is used. I do not want google or Macy's knowing if I happen to walk into their store and my wifi pings theirs.
 
The options given to you might not even work. See Google Tracks you even if you turn off 'location history' [1] and [2]


- [1] https://www.theverge.com/2018/8/13/17684660/google-turn-off-location-history-data (2018)
- [2] https://qz.com/1131515/google-collects-android-users-locations-even-when-location-services-are-disabled

# Services

| Service                         | Information        | Notes                                                   |
|---------------------------------|--------------------|---------------------------------------------------------|
| Search                          | Search History     | All my search history                                   |
| Gmail                           | E-mail Data        | All my E-mail dating back to 2009                       |
| Chrome Web History              | Browser History    | Names of web sites I visit                              |
| Chrome Saved Passwords          | Passwords          | Saved passwords for sites (almost every site)           |
| Maps on Android                 | Location data      | Location history, Phone goes everywhere                 |
| Google Operated Dns Servers     | DNS Queries        | See all DNS quries                                      |
| Photos                          | Pictures           | They run facial recognition on everyone                 |
| Google Music                    | Music              | All my music is hosted by google                        |
| Google Drive  Productivity      | Storage            | a lot of information is in google drive                 |
| Google Docs (Sheets, Docs, etc) | Productivity       | I store a lot of information in google docs             |
| Google Home                     | TTS Conversations  | Always on microphone virtual assistant                  |
| Hangouts                        | Chat Conversations | Everyone I chat with                                    |
| Keep                            | Notes              | All the random notes and shopping lists                 |
| Calendar                        | Events             | My calendar                                             |
| Contacts                        | Address book       | Everyone I call and e-mail                              |
| Voice                           | Telephone service  | Transcribes voicemails and collects phone call metadata |


# Photos

On top of facial recognition, there are other levels of processing performed.

They have ran extensive image processing on my photo library. I can ask google home to show me pictures of `pizza` and it shows mostly things similar to pizza



# Phone Sensors

| Sensor        | Notes
| ---           | ---
| Microphone    | Audio Recording
| Camera        | Picture and Video Recording
| GPS           | GPS Location - Location within meters
| 802.11 (Wifi) | Wifi Location - Triangulation
| Accelorometer | Local movement and direction



Notes
- With accelorometer they know if you're walking/driving/in a train/on a bike/etc and upload this data to google. https://www.youtube.com/watch?v=yIZmUINSvQ4




# Degoogle Resources

- [1] https://www.youtube.com/watch?v=RQUEgwgV99I
- [2] https://archive.ph/XzrbQ - archive of https://www.cupwire.com/google-timeline/


