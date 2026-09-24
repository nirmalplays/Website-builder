/**
 * Is this prompt asking for a new thing, or a change to the one on screen?
 *
 * Anything on screen used to make the next prompt an edit, which is right for
 * "make it dark" and badly wrong for "a website for a pet clinic". Open a
 * template to look at it, type an unrelated brief, and the build was handed the
 * template as context with instructions to keep its palette and structure - so
 * the pet clinic came out as that template re-themed, which reads as the app
 * having reached for a template on its own.
 *
 * Deliberately biased towards editing. Treating a change as a new build throws
 * away work the user wanted kept, which is much worse than the reverse: a new
 * build wrongly treated as an edit still produces the right page, just
 * constrained. So a prompt has to look clearly like a fresh brief to start one.
 */

/** Verbs that act on what is already there, whatever follows them. */
const EDIT_OPENERS =
  /^(?:also\s+)?(?:please\s+)?(?:can you\s+)?(?:now\s+)?(?:add|remove|delete|change|update|fix|tweak|adjust|improve|move|swap|replace|rename|reorder|resize|restyle|refactor|shorten|lengthen|translate|undo|revert|centre|center|align|increase|decrease|hide|show)\b/i;

/** Phrases that only make sense about an existing page. */
const REFERS_TO_EXISTING =
  /\b(?:make it|make them|make the|this page|this site|this app|the hero|the header|the footer|the nav|the form|the button|the section|instead of|rather than|same but|keep the|but with)\b/i;

/** A brief naming the kind of thing to build. */
const ARTEFACT =
  /\b(?:site|website|web ?app|app|application|page|landing|dashboard|store|shop|portfolio|blog|homepage|microsite|platform|tool|game)\b/i;

/** Openers that introduce a brief rather than a change. */
const BUILD_OPENER =
  /^(?:please\s+)?(?:can you\s+)?(?:i (?:want|need)\s+)?(?:create|build|make|design|generate|develop|code|scaffold|start)\b/i;

/** "A landing page for…", "An online store that…" */
const NOUN_PHRASE_BRIEF = /^(?:a|an|the)\s+[^.!?]{0,80}?/i;

/**
 * "I want a website for my bakery" carries no verb of its own — the wanting is
 * the verb — so it matched neither the build opener nor the noun-phrase shape.
 */
const WANTS_A = /^(?:i\s+)?(?:want|need|would like|am building|'m building)\b/i;

export function isNewBuildRequest(prompt: string): boolean {
  const text = prompt.trim();
  if (text.length < 8) return false;

  // An explicit reference to what is on screen settles it, even when the
  // sentence also names an artefact: "make the landing page dark" is an edit.
  if (REFERS_TO_EXISTING.test(text)) return false;
  if (EDIT_OPENERS.test(text)) return false;

  // "Build a booking app for a dentist" - a verb, then the thing to build.
  if (BUILD_OPENER.test(text) && ARTEFACT.test(text)) return true;

  // "A landing page for a specialty coffee roaster" - no verb, still a brief.
  if (NOUN_PHRASE_BRIEF.test(text) && ARTEFACT.test(text)) return true;

  // "I want a website for my bakery"
  if (WANTS_A.test(text) && ARTEFACT.test(text)) return true;

  return false;
}
