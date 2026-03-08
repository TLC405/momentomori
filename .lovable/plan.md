

## Plan: Comprehensive Mission Data Audit and Correction

### Research Findings

After thorough verification of all 40+ missions, here is the status of every listing:

**Confirmed Active (no changes needed):**
- DriveTanks (Uvalde, TX) -- active
- Hallett Motor Racing / Xtreme Xperience (Jennings, OK) -- active, but note: actual location is Jennings, not Tulsa
- Dig World (Katy, TX) -- active
- Zero Gravity Thrill Park (Dallas, TX) -- active
- Helicopter Hog Hunt / HeliBacon -- active
- Skydive Oklahoma (Cushing, OK) -- active
- Discovery Flight (Sundance Airport, OKC) -- active
- L-39 Fighter Jet (Houston, TX) -- active
- Lone Star Warbird Rides (Houston, TX) -- active
- D-Day Adventure Park (Wyandotte, OK) -- active
- H&H Shooting Sports (OKC) -- active
- Flamethrower Experience (DriveTanks/Uvalde) -- active
- Tiger Safari (Tuttle, OK) -- active, URL should be `tigersafarizoo.com`
- Arbuckle Wilderness (Davis, OK) -- active, URL should be `arbucklewildernesspark.com`
- Extreme Tornado Tours (OKC) -- active, prices now $2,950-$4,250 per tour
- Silver Lining Chase Tours (Norman, OK) -- active
- Valhalla Missile Silo Dive (Abilene, TX) -- active
- Catfish Noodling (Waurika, OK) -- active
- Riversport Rapids (OKC) -- active
- Riversport Sky Trail (OKC) -- active
- Xtreme Xperience at Texas Motor Speedway (Fort Worth, TX) -- active
- K1 Speed (OKC) -- active
- MotorSport Ranch (Cresson, TX) -- active
- Texas Drift Academy (Ennis, TX) -- active
- The Escape OKC -- active
- Terry Don West Bull Riding School (Henryetta, OK) -- active (June 2025 dates confirmed)
- Sankey Rodeo School (travels to multiple locations including Kiefer, OK) -- active
- Natural Bridge Caverns (San Antonio, TX) -- active
- War Eagle Cavern (Rogers, AR) -- active
- Rugaru Zipline Adventures (Broken Bow, OK) -- active (now called "Rugaru Adventures", $79-89/person)
- Buffalo River Canopy Tour (Jasper, AR) -- active
- Urban Tomahawk (Edmond, OK) -- active
- Class Axe Throwing (Dallas, TX) -- active (now in Richardson, not Deep Ellum)
- Thermal Night Hog Hunting (Graham, TX) -- active

**Issues Found -- Require Fixes:**

| # | Mission | Issue | Fix |
|---|---------|-------|-----|
| 1 | **Rally Ready / DirtFish** | DirtFish is in Snoqualmie, WA -- not Austin, TX. No DirtFish location exists in TX. | Replace with **MERUS Adventure Park** (Palo Duro Canyon, TX, ~4hrs from OKC) -- off-road adventure park with 5,500 acres, caving, overlanding |
| 2 | **JA Ranch "Working Ranch Experience"** | JA Ranch is a private working cattle ranch, not a tourist operation | Replace with **Wildcatter Ranch** (Graham, TX, ~3hrs from OKC) -- actual guest ranch with guided cowboy experiences, horseback riding, cattle work |
| 3 | **Oklahoma Full Auto Shoot** | Annual event (June), not year-round. Next: June 27-28, 2026 | Update description to note it's an annual event. Update price to $20-$30 entry |
| 4 | **Tiger Safari** | URL incorrect | Fix URL from `tigersafari.us` to `tigersafarizoo.com` |
| 5 | **Arbuckle Wilderness** | URL incorrect | Fix URL from `arbucklewilderness.com` to `arbucklewildernesspark.com` |
| 6 | **Hallett Supercar** | City listed as Tulsa but track is near Jennings, OK | Fix city to "Jennings" |
| 7 | **Dystopia Rising OK** | Still active with 2025 events scheduled (Oct, Nov, Dec) | Keep, but update description to note monthly weekend events. Location changed to "ZBASE High Adventure" |
| 8 | **Storm Chasing pricing** | Extreme Tornado Tours now $2,950-$4,250 per multi-day tour | Update price range and estimate |
| 9 | **Class Axe Throwing** | Moved from Deep Ellum to Richardson, TX | Update location/city |
| 10 | **Rugaru Zipline** | Name now "Rugaru Adventures", pricing is $79-89/person | Update name, price, URL to `rugaruadventures.com` |

### Implementation Steps

1. **Fix incorrect data for 10 missions** in `src/data/missions.ts`:
   - Replace Rally Ready with MERUS Adventure Park (new coordinates, URL, description)
   - Replace JA Ranch with Wildcatter Ranch (new coordinates, URL, description)
   - Update Oklahoma Full Auto Shoot description to note annual June event
   - Fix Tiger Safari URL
   - Fix Arbuckle Wilderness URL  
   - Fix Hallett city to Jennings
   - Confirm Dystopia Rising is active, update location details
   - Update Extreme Tornado Tours pricing
   - Update Class Axe location to Richardson
   - Update Rugaru name, pricing, URL

2. **Update `src/data/realms.ts`** mission counts if any realm gains/loses missions (counts stay the same since we're replacing 1:1).

No database changes or new components needed -- this is purely a data file update.

