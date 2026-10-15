# AllDevs Product Context

**AllDevs helps developers discover ideas and find people to build them with.**

The chosen product is **Build Circles**: a public idea forum with Tinder-like swipe discovery, creator-approved teams, and private real-time group chat. People swipe on ideas, not developer profiles. It is a collaboration product, not a dating app or commit leaderboard.

Updated: 2026-10-15. Architecture questions are closed and the user has requested feature planning, toolchain setup, and progression toward beta. A local foundation now exists, but product features and live beta are not ready. The launch city/community will be decided later. See [README.md](README.md) for the delivery plan, verified setup, and release gates.

**How to read this document:** Agreed rules are recorded below. Sections labeled Recommended or To Decide are not approved requirements.

## People and Their Goals

| Person | Goal |
| --- | --- |
| Visitor | Explore ideas and read public discussion before signing up |
| Builder | Find an interesting idea, ask questions, and offer to collaborate |
| Idea Creator | Share a proposal and choose suitable collaborators |
| Circle Member | Coordinate with the creator and other accepted collaborators |

One developer can create some ideas and join other circles. GitHub sign-in is required to post, comment, or send a build request. There is no minimum contribution history, follower count, or repository requirement. Work evidence is optional; GitHub sign-in does not prove skill or legal identity.

## The Main Journey

1. Read ideas and public comments without signing in.
2. Sign in with GitHub to participate and select a city or metro area; GPS is not required.
3. Publish an idea, or discover other ideas through forum browsing and swipe discovery.
4. Ask questions in the public discussion without needing circle membership.
5. Swipe right to send a build request, or left to skip.
6. The idea creator reviews requests and accepts collaborators. A request alone does not grant membership.
7. Accepted collaborators use private real-time circle chat or an external workspace.
8. Build together. Tracking milestones or completed work is recommended, not yet part of the agreed feature scope.

## Agreed Product Rules

### Ideas and Discovery

- Ideas are public proposals for things developers can build together. An existing repository is not required.
- Discovery is local-first: prioritize a user's selected city or metro area.
- Every idea is remote-friendly and accepts requests from other locations. There is no local-only creator setting.
- Remote eligibility does not guarantee acceptance. Creators still choose their collaborators.
- A left swipe means skip, not a public downvote or rejection of a person.
- Exact ranking, filters, skip persistence, and undo behavior remain to be decided.

**Recommended:** forum browsing and swipe discovery should be two views of the same idea posts, with equivalent buttons for people who do not use swipe gestures.

### Public Discussion and Private Teams

| Action | Agreed Access |
| --- | --- |
| Read an idea or its public discussion | Anyone, without sign-in |
| Post an idea or public comment | GitHub-signed-in users |
| Send a build request | GitHub-signed-in users, subject to the request allowance and safety rules |
| Become a collaborator | The idea creator must accept the request |
| Use private circle chat | The creator and accepted collaborators; no premium subscription required |

Commenting does not send a request or grant membership. Public discussion and private chat are separate. Build-request visibility and history access after membership changes are not yet decided.

### Build-Request Allowance

- Only a newly created build request consumes one allowance unit. The creator does not have to accept it for it to count.
- Equivalent requests from the forum follow the same rule as right swipes.
- Reading ideas and left-swipe skips consume no units.
- Failed request creation consumes no unit; retrying the same request must not count twice.
- Exhausting the allowance does not revoke existing membership or chat access.
- There is no paid bypass during beta.

**To Decide:** the numeric allowance, reset schedule, rollover, and whether withdrawal or rejection restores a unit.

### Chat and External Coordination

- Built-in real-time group chat is selected, rather than an asynchronous-only built-in discussion.
- Chat is private circle coordination and free in beta. It is not the premium feature.
- Circles can choose an external workspace instead; the external provider has its own terms, costs, and permissions.
- Member removal, message history, retention, export, and moderation require explicit policies before launch.
- Connected access must be revoked through explicit invalidation with a fallback stale-access target of at most 60 seconds. The local freshness helper is tested; actual chat enforcement and failure recovery are not implemented or verified yet. This is not a requirement to sign in every minute.

**Recommended Beta Scope:** text-first chat with bounded message size, room size, usage, and retention. Attachments, typing indicators, presence, read receipts, push notifications, DMs, and voice/video are not approved features.

### Free Beta and Future Premium

- Beta is free to users. No checkout, subscriptions, payment collection, or paywalls.
- Future premium means optional extra swipes after beta, not paid chat, sponsored circles, or paid membership.
- Premium never guarantees acceptance or bypasses creator approval, privacy, or abuse controls.
- Future pricing, packaging, allowances, and beta-exit timing are undecided. Billing is not a beta development requirement.

### The Pilot Budget

- Backend and other non-Vercel infrastructure spend is capped at USD 0 for the pilot. The user will handle Vercel frontend plan/costs separately, as an exception to the earlier all-in target.
- Limit usage proactively and throttle or temporarily pause chat rather than incur charges.
- Free access does not mean unlimited capacity or guaranteed uptime.
- Paid backend infrastructure requires new explicit approval, even if revenue exists later. User-managed Vercel costs do not authorize an assistant-initiated purchase or an unspecified spending amount.
- The number of users, connections, and messages that fit this budget has not been measured.

## Trust and User Protection

These are required design/launch considerations, not a completed policy or a claim of legal approval:

- Separate GitHub sign-in, importing work evidence, publishing a profile, and permission to contact someone.
- Use only permitted public GitHub evidence that users choose to include. Do not infer sensitive traits, exact location, availability, or competence from activity counts.
- Public GitHub data is not unrestricted personal data. No email harvesting, unsolicited bulk outreach, or sale of personal contact lists.
- Define profile visibility, correction, block/report, deletion, and protection against deleted data reappearing.
- Publicly posting an idea does not transfer ownership, grant a code license, or promise confidentiality.
- A public commenter must not gain private chat or contact access merely by commenting.
- External workspace links need an access policy. AllDevs cannot revoke a copied third-party invite without a separate integration.

## How We Will Judge Value

**Recommended primary outcome:** circles that reach a mutually agreed first working session or another verifiable building outcome.

Supporting measurements: published ideas, useful discussions, requests sent and accepted, time to first collaborator, returning builders, and abuse reports. Swipes and sign-ups alone are not proof of successful collaboration. Targets and completion criteria remain to be decided.

**Recommended validation:** test with a small consenting cohort before claiming product demand or free-tier capacity. The city/community and recruitment plan are explicitly deferred; 20-50 builders was a suggestion, not an agreed signup cap.

## To Decide Later

| Topic | Status |
| --- | --- |
| Launch city/community and recruitment | Explicitly deferred by the user |
| Beta cohort size, invite policy, and deadline | Not decided |
| Required idea fields, filters, and ranking | Not decided |
| Numeric request limits and reset/refund rules | Not decided |
| Request withdrawal/expiry, circle capacity, leaving/removal, and ownership changes | Not decided |
| Chat history, retention, deletion/export, moderation, and optional enhancements | Not decided |
| Profile/request/link visibility, search-engine indexing, and contact permissions | Not decided |
| Validation targets, supported workload, and beta-exit criteria | Not decided |
| Future premium price and packaging | Post-beta; not decided |
| Implementation and delivery | Stack selected; phased beta plan and local foundation in README. Feature workflows, policy checks, and release readiness remain incomplete |

These gaps do not block local foundation setup. Record any working defaults explicitly and resolve safety/capacity/privacy gates before live beta; do not claim launch readiness from scaffolding alone.

## Product Language

| Term | Meaning |
| --- | --- |
| Idea | A public proposal to build something together; not a developer profile |
| Idea Creator | The GitHub-signed-in developer who posts an idea and approves collaborators |
| Build Interest | A developer's willingness to help build an idea |
| Build Request | A request for collaboration; right swipe is one way to send it |
| Pass | A skip that consumes no build-request allowance; not a downvote |
| Build Circle | The collaboration group around an idea; not its pending-request list |
| Circle Member | An accepted collaborator; expressing interest alone is not membership |
| Public Idea Discussion | Comments anyone can read; GitHub sign-in is required to contribute |
| Circle Chat | Private built-in real-time coordination for the creator and accepted collaborators |
| Locality | A user-selected city or metro area; not a precise address or proof of residence |
| Local-first | Prioritizing nearby ideas without excluding remote collaboration |
| Remote-friendly | Allowing requests from other localities, without guaranteeing acceptance |
| Swipe Allowance | The allowance for newly created build requests, independent of membership and chat |
| Beta | The free initial release, with safety and operational limits but no billing |
| Premium | Optional paid extra swipes after beta; not a chat or circle subscription |
| External Workspace | A third-party coordination space with its own access controls and terms |

Avoid using "match" for both a request and an accepted membership. Say which relationship is meant.