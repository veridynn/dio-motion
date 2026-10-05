export type Locale = "de" | "en";
export type Page = "home";

export const sectionIds = {
	potential: { de: "potenzial", en: "potential" },
	approach: { de: "ansatz", en: "approach" },
	services: { de: "leistungen", en: "services" },
	about: { de: "ueber-mich", en: "about" },
	contact: { de: "kontakt", en: "contact" },
} as const;

export function localizeHash(hash: string, locale: Locale) {
	const section = Object.values(sectionIds).find((ids) =>
		Object.values(ids).some((id) => `#${id}` === hash),
	);
	return section ? `#${section[locale]}` : hash;
}

export const routes = {
	home: { de: "/", en: "/en/" },
	contact: { de: "/#kontakt", en: "/en/#contact" },
} as const;

export const copy = {
	de: {
		homeTitle: "dio motion. — Persönliches Training in Berlin",
		homeDescription:
			"Persönliches Training in Berlin mit Silvo Miguel. Training, Ernährung und Regeneration mit Fokus und Struktur.",
		cta: "Erstes Gespräch anfragen",
		tagline: "Persönliches Training in Berlin",
		skip: "Zum Inhalt",
		navigation: "Hauptnavigation",
		back: "Zurück",
		language: "Sprache wählen",
		potential: "Potenzial",
		approach: "Ansatz",
		services: "Leistungen",
		about: "Über mich",
		contact: "Kontakt",
		legal: "Impressum",
		privacy: "Datenschutzerklärung",
		hero: "Mittelmäßig war nie eine Option.",
		bridge: "Dein Körper ist zu mehr fähig, als du heute abrufst.",
		bridgeLead:
			"Der Unterschied ist nicht Motivation – sondern Fokus und Struktur.",
		approachHeading: [
			"Das ",
			"Was",
			" ist austauschbar. Das ",
			"Wie",
			" ist Handwerk.",
		],
		pillars: [
			[
				"Training",
				"Jede Einheit setzt dort an, wo die letzte aufgehört hat. Fortschritt ist keine Zufallsvariable.",
			],
			[
				"Ernährung",
				"Keine Dogmen. Keine Verbote. Ernährung, die zu dir passt. Nicht umgekehrt.",
			],
			[
				"Regeneration",
				"Erholung ist kein Luxus. Sie ist der Teil des Systems, in dem Veränderung entsteht.",
			],
		],
		assessment: "Standortbestimmung",
		assessmentLead:
			"Hautfaltenmessung. Muskelfunktionstests. Übungsausführung. Du gehst mit Klarheit – und einem Plan.",
		tiers: [
			["Flexibles Kontingent", "Training nach Bedarf – ohne feste Taktung."],
			[
				"Fokussierter Block",
				"Für einen definierten Zeitraum mit klarem Rahmen. Du führst aus – den Rest übernehme ich.",
			],
		],
		aboutHeading: [
			"Bewegung ist mein Weg.",
			"Als Instinkt. Als Studium. Als Beruf.",
		],
		aboutLead: [
			"Was sich vertieft, ist der Anspruch.",
			"Präziser. Ruhiger. Konsequenter.",
		],
		aboutBody:
			"Personal Training auf diesem Niveau ist keine Arbeit. Es ist Handwerk.",
		ready: "Erstes Gespräch anfragen.",
		contactLead:
			"Schreib mir, worum es geht. Ich melde mich innerhalb eines Werktags.",
		name: "Name",
		email: "E-Mail",
		message: "Nachricht",
		sendMessage: "Anfrage senden",
		sending: "Wird gesendet …",
		formPreview:
			"Danke! Das ist ein Test – deine Anfrage wurde noch nicht versendet.",
		formHelp: "E-Mail und Nachricht sind Pflichtfelder.",
		formSuccess: "Danke! Deine Nachricht wurde gesendet.",
		formError:
			"Deine Nachricht konnte nicht bestätigt werden. Deine Eingaben bleiben erhalten. Bitte versuche es erneut.",
		captchaError:
			"Die Sicherheitsprüfung konnte nicht abgeschlossen werden. Bitte versuche es erneut.",
		captchaNotice: "Geschützt durch hCaptcha. Es gelten die",
		captchaAnd: " und die ",
		captchaTerms: "Nutzungsbedingungen",
		nameError: "Bitte verwende höchstens 100 Zeichen.",
		emailError:
			"Bitte gib eine gültige E-Mail-Adresse mit höchstens 254 Zeichen ein.",
		messageError: "Bitte schreibe eine Nachricht mit 1 bis 5000 Zeichen.",
		emailSubject: "Erstes Gespräch",
	},
	en: {
		homeTitle: "dio motion. — Personal training in Berlin",
		homeDescription:
			"Personal training in Berlin with Silvo Miguel. Training, nutrition and recovery with focus and structure.",
		cta: "Arrange a first conversation",
		tagline: "Personal training in Berlin",
		skip: "Skip to content",
		navigation: "Main navigation",
		back: "Back",
		language: "Choose language",
		potential: "Potential",
		approach: "Approach",
		services: "Services",
		about: "About me",
		contact: "Contact",
		legal: "Legal notice",
		privacy: "Privacy policy",
		hero: "Mediocre was never an option.",
		bridge: "Your body is capable of more than you ask of it today.",
		bridgeLead: "The difference is not motivation – it is focus and structure.",
		approachHeading: [
			"The ",
			"what",
			" is interchangeable. The ",
			"how",
			" is a craft.",
		],
		pillars: [
			["Training", "Each session builds on the last. Progress is no accident."],
			[
				"Nutrition",
				"No dogma. No bans. Nutrition that fits you. Not the other way around.",
			],
			[
				"Recovery",
				"Rest is not a luxury. It is the part of the process where change happens.",
			],
		],
		assessment: "Find your starting point",
		assessmentLead:
			"Skinfold measurements. Muscle function tests. Exercise technique. Leave with clarity – and a plan.",
		tiers: [
			[
				"Flexible sessions",
				"Training when you need it – without a fixed schedule.",
			],
			[
				"Focused programme",
				"A defined period with a clear structure. You put in the work – I take care of the rest.",
			],
		],
		aboutHeading: [
			"Movement is my path.",
			"By instinct. Through study. As a profession.",
		],
		aboutLead: [
			"The standard keeps rising.",
			"More precise. More considered. More consistent.",
		],
		aboutBody:
			"Personal training at this level is more than a job. It is a craft.",
		ready: "Arrange a first conversation.",
		contactLead:
			"Tell me what you have in mind. I will get back to you within one working day.",
		name: "Name",
		email: "Email",
		message: "Message",
		sendMessage: "Send enquiry",
		sending: "Sending …",
		formPreview:
			"Thank you! This is a test — your enquiry has not been sent yet.",
		formHelp: "Email and message are required.",
		formSuccess: "Thank you! Your message has been sent.",
		formError:
			"We could not confirm your message was sent. Your entries are preserved. Please try again.",
		captchaError:
			"The security check could not be completed. Please try again.",
		captchaNotice: "Protected by hCaptcha. See its",
		captchaAnd: " and ",
		captchaTerms: "Terms of Service",
		nameError: "Please use no more than 100 characters.",
		emailError:
			"Please enter a valid email address with no more than 254 characters.",
		messageError: "Please write a message with 1 to 5000 characters.",
		emailSubject: "First conversation",
	},
};
