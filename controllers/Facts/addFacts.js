const fs = require("fs");
const path = require("path");

const Fact = require("../../models/fact");

function createFact() {
  const facts = [
    "Trophic levels are the hierarchical levels in an ecosystem, comprising producers at the bottom, followed by primary consumers, secondary consumers, and tertiary consumers, with decomposers breaking down dead materials at all levels.",

    "المستويات الغذائية هي المستويات الهرمية في النظام البيئي، تتألف من المنتجين في القاعدة، يليهم المستهلكون الأوليون، ثم المستهلكون الثانويون، والمستهلكون الثالثون مع وجود المحللين الذين يقومون بتحليل المواد الميتة على جميع المستويات.",
    "The Christmas Truce of 1914 during World War I was a remarkable instance of fraternization between enemy troops. Soldiers along the Western Front informally ceased fighting, exchanged gifts, and even played football together.",

    "هدنة عيد الميلاد عام 1914 خلال الحرب العالمية الأولى كانت مثالاً بارزاً للتآخي بين القوات المتعادية. حيث توقف الجنود على الجبهة الغربية بشكل غير رسمي عن القتال، وتبادلوا الهدايا، ولعبوا كرة القدم معًا.",
    "The Steller's sea cow, a giant marine mammal discovered in the 18th century, was hunted to extinction within 27 years of its discovery. It was related to the manatee and the dugong, but much larger, measuring up to 9 meters (30 feet) long.",

    "حيوان بقرة ستيلر البحرية، الثديي البحري العملاق الذي تم اكتشافه في القرن الثامن عشر، تم اصطياده حتى الانقراض خلال 27 عامًا من اكتشافه. كان يرتبط بحيوان الماناتي والدوجونغ، لكنه كان أكبر بكثير، حيث يصل طوله إلى 9 أمتار (30 قدمًا).",
    "Rudolf Virchow, known as the 'father of modern pathology,' made significant contributions in the 19th century. He developed the theory of cellular pathology, stating that diseases arise from abnormalities in cells, fundamentally changing the way diseases were understood and treated.",

    "روودولف فيرشو، المعروف بـ'أبو علم الأمراض الحديث'، قدم مساهمات كبيرة في القرن التاسع عشر. طور نظرية الأمراض الخلوية، موضحًا أن الأمراض تنشأ من شذوذ في الخلايا، مما غير بشكل جذري الطريقة التي كانت تُفهم بها الأمراض وتُعالج.",
    "The 'pareidolia' phenomenon is where the mind perceives a familiar pattern of something where none actually exists, such as seeing faces in clouds, the moon, or inanimate objects. This is thought to be a result of the brain's tendency to find meaning in random patterns.",

    "ظاهرة الباريدوليا هي حيث يدرك العقل نمطًا مألوفًا لشيء ما حيث لا يوجد في الواقع، مثل رؤية وجوه في السحب، القمر، أو الأشياء غير الحية. يُعتقد أن هذا نتيجة لميل الدماغ إلى إيجاد معنى في الأنماط العشوائية.",
    "The Antarctic Treaty, signed in 1959 by 12 countries, dedicates the continent to peaceful research activities and bans military activity, nuclear testing, and nuclear waste disposal. As of 2021, 54 countries are signatories to the treaty.",

    "تم توقيع معاهدة القطب الجنوبي في عام 1959 من قبل 12 دولة، وتُكرس القارة للأنشطة البحثية السلمية وتحظر النشاط العسكري، والتجارب النووية، والتخلص من النفايات النووية. اعتبارًا من عام 2021، هناك 54 دولة موقعة على المعاهدة.",
    "Biodiversity, a measure of the variety of life, is crucial for ecosystem resilience, allowing ecosystems to recover from disturbances and maintain functions such as air and water purification, pollination of plants, and decomposition of waste.",

    "التنوع البيولوجي، مقياس لتنوع الحياة، ضروري لمرونة النظام البيئي، مما يسمح للنظم البيئية بالتعافي من الاضطرابات والحفاظ على وظائف مثل تنقية الهواء والماء، تلقيح النباتات، وتحلل النفايات",

    "Frozen section procedure, a rapid microscopic analysis of a specimen, was developed in the early 20th century. It allows pathologists to provide immediate diagnosis during surgery, enabling surgeons to make critical decisions on the spot.",

    "تم تطوير إجراء القطع المجمد، وهو تحليل مجهري سريع لعينة، في أوائل القرن العشرين. يسمح هذا الإجراء لأخصائيي علم الأمراض بتقديم تشخيص فوري أثناء الجراحة، مما يمكن الجراحين من اتخاذ قرارات حاسمة في الحال.",
    "Ancient Egyptians invented one of the earliest known forms of writing, called hieroglyphics, which were used for over 3,500 years. They also made significant contributions to the fields of medicine, engineering, and agriculture.",

    "اخترع المصريون القدماء إحدى أقدم الأشكال المعروفة للكتابة، والتي تسمى الهيروغليفية، والتي استخدمت لأكثر من 3500 عام. كما قدموا مساهمات كبيرة في مجالات الطب والهندسة والزراعة.",
    "Dogs have a hearing frequency range of about 40 Hz to 60,000 Hz, which is why they can hear sounds that are imperceptible to humans.",

    "للكلاب مدى تردد سمعي يتراوح بين حوالي 40 هرتز إلى 60,000 هرتز، ولذلك يمكنهم سماع الأصوات التي لا تُسمع للبشر.",
    "The video game industry is larger than the movie and music industries combined, making it one of the most lucrative entertainment sectors in the world.",

    "صناعة ألعاب الفيديو أكبر من صناعة الأفلام والموسيقى مجتمعة، مما يجعلها واحدة من أكثر قطاعات الترفيه ربحية في العالم.",
    "The Franco-Prussian War (1870-1871) led to the unification of Germany and significantly altered the balance of power in Europe, setting the stage for World War I by enhancing German military and industrial might.",

    "أدت الحرب الفرنسية الروسية (1870-1871) إلى توحيد ألمانيا وغيرت بشكل كبير موازين القوى في أوروبا، مما مهد الطريق للحرب العالمية الأولى من خلال تعزيز القوة العسكرية والصناعية الألمانية.",
    "The first software 'bug' was recorded in 1947 when a moth was found trapped in a relay of the Harvard Mark II computer, leading to the term 'debugging' for fixing software issues.",

    "تم تسجيل أول 'خطأ برمجي' في عام 1947 عندما تم العثور على عثة محاصرة في جهاز الكمبيوتر الذي كان يسمى هارفارد مارك الثاني، مما أدى إلى استخدام مصطلح 'التصحيح' لإصلاح مشاكل البرمجيات.",
    "The Maya civilization developed the only fully developed written language of the pre-Columbian Americas, as well as making significant advancements in mathematics, astronomy, and architecture.",

    "طورت حضارة المايا اللغة المكتوبة الوحيدة المتطورة بالكامل في الأمريكتين قبل الاستعمار، بالإضافة إلى تحقيق تقدم كبير في الرياضيات والفلك والعمارة.",
    "The UFO sightings reported near Roswell, New Mexico, in 1947 remain one of the most famous incidents associated with extraterrestrial life. Although officially attributed to a military surveillance balloon, many believe it was a cover-up for an alien spacecraft crash.",

    "تظل مشاهدات الأجسام الطائرة المجهولة التي تم الإبلاغ عنها بالقرب من روزويل، نيو مكسيكو، في عام 1947 واحدة من أشهر الحوادث المرتبطة بالحياة خارج الأرض. على الرغم من أنها نُسبت رسميًا إلى بالون مراقبة عسكري، يعتقد الكثيرون أنها كانت تغطية لحادث تحطم مركبة فضائية.",
    "The world's first known peace treaty was between the Egyptians and the Hittites, known as the Treaty of Kadesh. It was signed in 1259 BCE, ending years of conflict over control of Syrian lands.",

    "أول معاهدة سلام معروفة في العالم كانت بين المصريين والحثيين، وتعرف باسم معاهدة قادش. تم التوقيع عليها في عام 1259 قبل الميلاد، مما أنهى سنوات من النزاع على السيطرة على الأراضي السورية",
    "The Pacific Ocean is the world's largest ocean, covering more than 30% of the Earth's surface. It's larger than all the Earth's land area combined.",

    "المحيط الهادئ هو أكبر محيطات العالم، حيث يغطي أكثر من 30% من سطح الأرض. إنه أكبر من مجموع مساحات اليابسة على الأرض.",
    "Shuttle launches were visible from hundreds of miles away and attracted large crowds of spectators, especially during significant missions such as the first launch, return to flight missions after the Challenger and Columbia disasters, and the final launch of the program.",

    "كانت إطلاقات المكوك الفضائي مرئية من مئات الأميال وجذبت حشودًا كبيرة من المتفرجين، خاصة خلال المهام الهامة مثل الإطلاق الأول، ومهام العودة للطيران بعد كوارث تشالنجر وكولومبيا، والإطلاق الأخير للبرنامج.",
    "The pirate code, or 'articles,' were rules agreed upon by the crew. These codes regulated discipline, division of loot, and conduct among pirates. Every pirate crew had its own set of articles.",

    "كان ميثاق القراصنة، أو 'المواد'، قواعد تم الاتفاق عليها بين أفراد الطاقم. كانت هذه القوانين تنظم الانضباط، وتقسيم الغنائم، والسلوك بين القراصنة. كان لكل طاقم قراصنة مجموعة خاصة به من المواد.",
    "The 'Rorschach test' is a psychological test in which subjects' perceptions of inkblots are recorded and then analyzed using psychological interpretation, complex algorithms, or both. It's used to examine a person's personality characteristics and emotional functioning.",

    "اختبار 'روشاخ' هو اختبار نفسي يتم فيه تسجيل إدراكات الأشخاص للبقع الحبرية ثم تحليلها باستخدام التفسير النفسي، أو الخوارزميات المعقدة، أو كليهما. يُستخدم لفحص خصائص شخصية الفرد ووظائفه العاطفية.",
  ];

  //store the facts in the database
  console.log("Facts length: ", facts.length);

  for (let i = 0; i < facts.length; i += 2) {
    const fact = Fact.create({
      englishFact: facts[i],
      arabicFact: facts[i + 1],
      type: "Fun",
      imageId: "Picture" + (i / 2 + 1) + ".jpg",
    });
  }
}

module.exports = createFact;
