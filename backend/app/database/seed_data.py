from sqlalchemy.orm import Session
from app.database.models import Disease

SEED_DISEASES = [
    # TOMATO
    {
        "plant_name": "Tomato",
        "disease_name": "Tomato Early Blight",
        "description": "Early blight is a widespread fungal disease caused by Alternaria solani affecting tomatoes and potatoes. It causes significant defoliation and fruit rot if untreated.",
        "symptoms": "Dark brown to black spots with characteristic concentric rings ('target board' pattern) initially appearing on the lower older leaves. Surrounding leaf tissue may turn yellow (chlorosis). Stems develop sunken dark cankers.",
        "causes": "Alternaria solani fungal spores that overwinter in infected plant debris or soil. Favored by warm temperatures (24-29°C / 75-85°F) combined with high humidity, heavy morning dew, or frequent rainfall.",
        "prevention": "Rotate crops every 2-3 years away from solanaceous plants. Mulch around plant bases to prevent soil splashing onto foliage. Water at ground level using drip irrigation. Prune bottom leaves to improve air circulation.",
        "treatment": "Remove and destroy affected lower foliage immediately. Apply copper-based organic fungicides, chlorothalonil, or mancozeb at the first sign of symptoms every 7-14 days. Ensure tools are sanitized.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/tomato_early_blight.jpg"
    },
    {
        "plant_name": "Tomato",
        "disease_name": "Tomato Late Blight",
        "description": "Late blight is a destructive water mold (oomycete) infection caused by Phytophthora infestans. It historically caused the Irish Potato Famine and can destroy entire fields within days.",
        "symptoms": "Irregular pale green to water-soaked lesions that quickly turn dark purplish-brown. In humid weather, a delicate white fuzzy fungal growth appears on the underside of leaves. Fruits develop greasy dark brown blotches.",
        "causes": "Phytophthora infestans thriving in cool (15-20°C / 60-70°F), wet, overcast, or foggy conditions. Windblown sporangia travel miles between neighboring fields.",
        "prevention": "Plant certified disease-free seedlings and resistant varieties (e.g., Mountain Magic, Defiant). Space plants widely for fast leaf drying. Avoid overhead watering.",
        "treatment": "Immediately prune and bag infected branches (do not compost). Apply systemic bio-fungicides or targeted fungicides containing mefenoxam, cymoxanil, or copper hydroxide proactively during high-risk weather.",
        "severity_level": "Critical",
        "is_healthy": False,
        "image_example_url": "/static_samples/tomato_late_blight.jpg"
    },
    {
        "plant_name": "Tomato",
        "disease_name": "Tomato Yellow Leaf Curl Virus",
        "description": "A devastating viral disease caused by TYLCV, transmitted by the silverleaf whitefly (Bemisia tabaci), causing stunted growth and severe yield loss.",
        "symptoms": "Upward curling and cupping of leaflet margins, pronounced yellowing (chlorosis) between leaf veins, reduced leaflet size, bushy stunted plant habit, and blossom drop.",
        "causes": "Tomato Yellow Leaf Curl Geminivirus transmitted efficiently by adult whiteflies feeding on plant sap.",
        "prevention": "Use 50-mesh insect netting in greenhouses. Install yellow sticky traps to monitor and catch whiteflies. Remove weeds that act as alternate hosts. Plant TYLCV-resistant hybrids.",
        "treatment": "No cure exists once infected; rogue out and destroy infected plants immediately to prevent transmission. Control whitefly populations using insecticidal soap, neem oil, or imidacloprid.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/tomato_yellow_curl.jpg"
    },
    {
        "plant_name": "Tomato",
        "disease_name": "Tomato Septoria Leaf Spot",
        "description": "A very common fungal disease caused by Septoria lycopersici that attacks foliage during humid summers, weakening plants.",
        "symptoms": "Numerous small circular spots (1-3mm) with dark brown borders and pale tan or gray centers. Tiny black specks (pycnidia) can be seen inside the gray centers with a hand lens.",
        "causes": "Septoria lycopersici fungi splash-dispersed by rain or sprinkler irrigation from infected soil or overwintered crop residue.",
        "prevention": "Avoid overhead watering. Maintain 3-foot spacing between plants. Stake or cage tomatoes to keep foliage off the ground. Apply thick organic mulch.",
        "treatment": "Strip infected lower leaves as soon as spots appear. Apply copper fungicides, chlorothalonil, or Bacillus subtilis biofungicide on a regular preventive schedule.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/tomato_septoria.jpg"
    },
    {
        "plant_name": "Tomato",
        "disease_name": "Tomato Healthy",
        "description": "The tomato plant exhibits vigorous vegetative growth with vibrant green leaves, strong turgidity, and no signs of pathogen infection or nutrient deficiency.",
        "symptoms": "Uniform deep green foliage, crisp leaf margins, normal leaf morphology, sturdy stem growth, and healthy flower trusses.",
        "causes": "Optimal cultural conditions: balanced N-P-K nutrition, 6-8 hours of sunlight, proper moisture, and absence of insect pests or pathogens.",
        "prevention": "Continue regular balanced fertilization, consistent deep watering, adequate airflow, and weekly scouting for pests.",
        "treatment": "No disease treatment required. Maintain standard good agricultural practices and crop maintenance.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/tomato_healthy.jpg"
    },

    # POTATO
    {
        "plant_name": "Potato",
        "disease_name": "Potato Early Blight",
        "description": "Caused by Alternaria solani, this fungal infection causes premature leaf dieback and tuber surface decay in solanaceous crops.",
        "symptoms": "Dark brown circular or angular lesions with concentric target rings on older foliage. Leaves turn yellow around spots and eventually wither and drop.",
        "causes": "Alternaria solani spores surviving in infected tuber seed pieces and crop residues, triggered by alternating dry and wet periods.",
        "prevention": "Plant certified disease-free seed tubers. Practice 3-year crop rotation. Ensure proper soil fertility (especially potassium and nitrogen) to avoid plant stress.",
        "treatment": "Apply protectant fungicides like chlorothalonil or mancozeb before canopy closure. Ensure complete foliage coverage during warm humid weather.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/potato_early_blight.jpg"
    },
    {
        "plant_name": "Potato",
        "disease_name": "Potato Late Blight",
        "description": "The catastrophic disease caused by Phytophthora infestans that rapidly rots foliage, stems, and underground tubers.",
        "symptoms": "Large, irregular water-soaked spots that turn dark brown to black with pale green halos. White downy sporulation underneath leaves during damp conditions. Tubers exhibit dry, reddish-brown granular rot.",
        "causes": "Phytophthora infestans water mold spreading rapidly via cool rain, wind, and fog.",
        "prevention": "Hill potatoes well to shield developing tubers from washing spores. Destroy volunteer potato plants and cull piles. Choose resistant varieties.",
        "treatment": "Destroy severely blighted foliage before tuber harvest. Apply specialized fungicides such as mandipropamid, fluopicolide, or copper formulations.",
        "severity_level": "Critical",
        "is_healthy": False,
        "image_example_url": "/static_samples/potato_late_blight.jpg"
    },
    {
        "plant_name": "Potato",
        "disease_name": "Potato Healthy",
        "description": "Healthy potato plant exhibiting lush, vibrant green foliage and vigorous underground stolon and tuber development.",
        "symptoms": "Rich green composite leaves, clean stems, no chlorotic or necrotic spots, excellent vigor.",
        "causes": "Well-drained slightly acidic soil (pH 5.8-6.5), balanced nutrition, and sound pest management.",
        "prevention": "Maintain consistent moisture and adequate hilling to protect tubers from sunlight and pests.",
        "treatment": "No treatment needed. Keep soil evenly moist and scout for Colorado potato beetles.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/potato_healthy.jpg"
    },

    # PEPPER (BELL PEPPER)
    {
        "plant_name": "Pepper",
        "disease_name": "Pepper Bacterial Spot",
        "description": "A prevalent bacterial disease caused by Xanthomonas campestris pv. vesicatoria causing defoliation, sunburned fruit, and scarred produce.",
        "symptoms": "Small, water-soaked, yellowish-green spots on leaves that turn dark brown with greasy texture. Lesions often blister slightly. Infected leaves turn yellow and drop prematurely.",
        "causes": "Xanthomonas bacteria entering through stomata and leaf wounds during warm, rainy, stormy weather or overhead sprinkler irrigation.",
        "prevention": "Use certified pathogen-free seed treated with hot water. Avoid working in pepper fields when foliage is wet. Rotate fields away from solanaceous crops for 2 years.",
        "treatment": "Spray fixed copper combined with mancozeb, or use biological bactericides like Serenade (Bacillus amyloliquefaciens). Remove severely infected seedlings.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/pepper_bacterial_spot.jpg"
    },
    {
        "plant_name": "Pepper",
        "disease_name": "Pepper Healthy",
        "description": "The pepper foliage is healthy, deep emerald green with glossy leaf surfaces and normal flower and fruit set.",
        "symptoms": "Glossy green leaves, strong central stem, no spotting, no curling, no discoloration.",
        "causes": "Optimal temperature (20-30°C), adequate calcium in soil, and uniform irrigation.",
        "prevention": "Provide balanced fertilizer, avoid over-nitrogenization, and apply organic mulch.",
        "treatment": "No intervention required. Keep checking for aphids and thrips on underside of leaves.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/pepper_healthy.jpg"
    },

    # APPLE
    {
        "plant_name": "Apple",
        "disease_name": "Apple Scab",
        "description": "Apple scab, caused by the ascomycete fungus Venturia inaequalis, is the most economically significant apple disease worldwide.",
        "symptoms": "Olive-green to velvety brown velvety spots on upper leaf surfaces that become raised and corky. Affected leaves yellow and drop early. Fruit develops dark, scabby, cracked lesions.",
        "causes": "Venturia inaequalis ascospores released from fallen leaves in spring during extended rainy periods (6+ hours of leaf wetness).",
        "prevention": "Shred or remove fallen apple leaves in autumn. Prune tree canopies to maximize sunlight and wind penetration. Plant scab-resistant cultivars like Honeycrisp, Liberty, or Freedom.",
        "treatment": "Apply protective fungicides (captan, myclobutanil, or sulfur) starting from green tip stage through petal fall. Use bio-control agents like Serenade ASO.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/apple_scab.jpg"
    },
    {
        "plant_name": "Apple",
        "disease_name": "Apple Black Rot",
        "description": "Caused by the fungus Botryosphaeria obtusa, causing 'frogeye leaf spot', cankers on woody branches, and mummified rotting fruit.",
        "symptoms": "Small purple spots that enlarge into circular lesions with dark margins and light tan or gray centers (frogeye appearance). Fruit develops firm black rot with concentric rings.",
        "causes": "Botryosphaeria obtusa infecting stressed or wounded trees, dead twigs, and fire-blight cankers.",
        "prevention": "Prune out dead wood, cankered limbs, and remove mummified fruits from trees and orchard floor during winter dormancy.",
        "treatment": "Apply fungicides such as captan, thiophanate-methyl, or sulfur during early leaf emergence and pre-bloom.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/apple_black_rot.jpg"
    },
    {
        "plant_name": "Apple",
        "disease_name": "Apple Cedar Rust",
        "description": "Caused by Gymnosporangium juniperi-virginianae, an heteroecious fungus requiring both Eastern red cedar and apple trees to complete its life cycle.",
        "symptoms": "Bright yellow-orange or reddish spots on upper leaf surfaces that develop tiny black dots, followed by tube-like fungal aecia structures projecting on the leaf underside.",
        "causes": "Spores blown from cedar galls ('cedar apples') during warm spring rains up to several miles away.",
        "prevention": "Remove wild cedar trees within a few hundred yards of the orchard where feasible. Plant rust-resistant apple cultivars.",
        "treatment": "Apply systemic sterol-inhibiting fungicides (such as myclobutanil or propiconazole) from pink bud stage through early summer.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/apple_cedar_rust.jpg"
    },
    {
        "plant_name": "Apple",
        "disease_name": "Apple Healthy",
        "description": "Pristine apple foliage with clean green leaves, intact petioles, and robust spur growth without blemishes or mildew.",
        "symptoms": "Crisp green leaf blades, smooth leaf margins, uniform veining, vigorous terminal shoots.",
        "causes": "Good pruning management, balanced soil minerals, adequate moisture, and routine orchard sanitation.",
        "prevention": "Maintain dormant oil sprays in winter, regular canopy thinning, and monitor weather conditions.",
        "treatment": "No treatment required.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/apple_healthy.jpg"
    },

    # CORN (MAIZE)
    {
        "plant_name": "Corn",
        "disease_name": "Corn Common Rust",
        "description": "Common rust, caused by the fungus Puccinia sorghi, occurs globally wherever maize is cultivated, reducing grain fill and stover quality.",
        "symptoms": "Small, powdery, cinnamon-brown to dark reddish-brown pustules (uredinia) scattered across both upper and lower leaf surfaces. Pustules rupture the epidermis.",
        "causes": "Puccinia sorghi fungal urediniospores blown northward each season by warm southerly winds. Favored by high humidity and moderate temperatures (16-25°C).",
        "prevention": "Plant rust-resistant or tolerant corn hybrids with specific Rp resistance genes. Plant early in the season to evade peak spore migration.",
        "treatment": "Foliar fungicides (strobilurins and triazoles like azoxystrobin or pyraclostrobin) are effective if applied when pustules first appear on upper leaves before tasseling.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/corn_rust.jpg"
    },
    {
        "plant_name": "Corn",
        "disease_name": "Corn Northern Leaf Blight",
        "description": "Caused by Setosphaeria turcica (Exserohilum turcicum), this fungal disease leads to substantial photosynthetic leaf area loss during grain fill.",
        "symptoms": "Long, elliptical, cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) parallel to leaf veins. In wet weather, dark fungal spores appear within lesions.",
        "causes": "Setosphaeria turcica overwintering in corn residue. Promoted by moderate temperatures (18-27°C) and extended dew periods.",
        "prevention": "Rotate crops with soybeans or small grains. Tillage to incorporate residue in high-risk fields. Plant resistant hybrid varieties.",
        "treatment": "Scout fields around V14 to tasseling. Apply dual-mode foliar fungicides (triazole + strobilurin) if lesions appear on the third leaf below the ear or higher.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/corn_leaf_blight.jpg"
    },
    {
        "plant_name": "Corn",
        "disease_name": "Corn Healthy",
        "description": "Vigorous, dark green corn canopy displaying broad leaves with intact chlorophyll, sturdy stalks, and strong photosynthetic capacity.",
        "symptoms": "Uniform deep green color, smooth parallel venation, crisp leaf blades, absence of pustules or necrotic lesions.",
        "causes": "Optimal soil nitrogen, adequate moisture during vegetative stages, and effective weed and insect management.",
        "prevention": "Maintain balanced fertility and scout regularly for rootworms and borers.",
        "treatment": "No treatment needed.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/corn_healthy.jpg"
    },

    # GRAPE
    {
        "plant_name": "Grape",
        "disease_name": "Grape Black Rot",
        "description": "A destructive fungal disease caused by Guignardia bidwellii that attacks all green vine tissues, particularly young fruit clusters.",
        "symptoms": "Reddish-brown circular leaf spots containing tiny black specks (pycnidia) arranged in a ring. Berries turn light brown, soften, shrivel into hard black wrinkled mummies.",
        "causes": "Guignardia bidwellii spores released from mummified berries and cane lesions during warm spring rain showers.",
        "prevention": "Remove and bury or burn all mummified grape clusters during winter pruning. Maintain an open canopy via leaf pulling and shoot positioning.",
        "treatment": "Apply fungicides such as mancozeb, captan, or myclobutanil starting at 1-3 inch shoot growth through 4 weeks post-bloom.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/grape_black_rot.jpg"
    },
    {
        "plant_name": "Grape",
        "disease_name": "Grape Esca (Black Measles)",
        "description": "A complex fungal trunk disease caused by Phaeomoniella chlamydospora and Fomitiporia mediterranea that affects vine vascular systems.",
        "symptoms": "'Tiger-stripe' patterns on leaves with interveinal yellowing and necrotic brown banding. Fruit develops small dark brown or purple flecks ('measles'). Sudden vine collapse (apoplexy).",
        "causes": "Fungal penetration through pruning wounds in woody grapevine trunks over several years.",
        "prevention": "Protect pruning wounds with wound sealants or biological paste (Trichoderma). Prune late in the dormant season when wounds heal faster.",
        "treatment": "No cure exists once established in the trunk. Prune out dead cordons back to healthy white wood. Avoid vine water stress.",
        "severity_level": "High",
        "is_healthy": False,
        "image_example_url": "/static_samples/grape_esca.jpg"
    },
    {
        "plant_name": "Grape",
        "disease_name": "Grape Healthy",
        "description": "Vibrant grapevine leaves with prominent lobes, bright green coloring, supple texture, and vigorous shoot growth.",
        "symptoms": "Clean palmate leaves, intact margins, rich green color, active tendril growth.",
        "causes": "Good vineyard airflow, well-drained soil, timely trellis management, and absence of fungal pathogens.",
        "prevention": "Continue canopy management and standard vineyard sanitation.",
        "treatment": "No disease treatment required.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/grape_healthy.jpg"
    },

    # STRAWBERRY
    {
        "plant_name": "Strawberry",
        "disease_name": "Strawberry Leaf Scorch",
        "description": "Caused by the fungus Diplocarpon earlianum, leaf scorch diminishes photosynthetic leaf area, reducing berry yields and plant vigor.",
        "symptoms": "Irregular purple or reddish-brown blotches across leaves without distinct centers. Blotches coalesce causing entire leaves to curl, turn brown, and appear scorched by fire.",
        "causes": "Diplocarpon earlianum fungi dispersed by rain splashing from dead leaves to green foliage in damp conditions.",
        "prevention": "Renovate strawberry beds after harvest by mowing and removing old foliage. Plant in full sun with excellent air circulation. Avoid overhead watering.",
        "treatment": "Apply registered fungicides such as captan or copper before bloom and after post-harvest renovation if leaf spotting was severe.",
        "severity_level": "Medium",
        "is_healthy": False,
        "image_example_url": "/static_samples/strawberry_leaf_scorch.jpg"
    },
    {
        "plant_name": "Strawberry",
        "disease_name": "Strawberry Healthy",
        "description": "Lush trifoliate strawberry foliage, vibrant emerald green, producing healthy runners, crowns, and blossom clusters.",
        "symptoms": "Bright green trifoliate leaflets, serrated clean edges, vigorous crown formation, zero spot blemishes.",
        "causes": "Well-aerated sandy-loam soil rich in organic matter, drip irrigation, and clean straw mulching.",
        "prevention": "Ensure beds are weed-free and avoid waterlogging around root crowns.",
        "treatment": "No treatment needed.",
        "severity_level": "None",
        "is_healthy": True,
        "image_example_url": "/static_samples/strawberry_healthy.jpg"
    }
]

def seed_database(db: Session):
    existing_count = db.query(Disease).count()
    if existing_count == 0:
        for item in SEED_DISEASES:
            disease = Disease(**item)
            db.add(disease)
        db.commit()
        print(f"Successfully seeded {len(SEED_DISEASES)} plant disease profiles into the database.")
    else:
        print(f"Database already contains {existing_count} disease records. Skipping seed.")
