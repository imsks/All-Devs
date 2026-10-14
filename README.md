# AllDevs

GitHub-native product discovery and decision record.

**Status:** Discovery. Build Circles is the selected product direction: local developers publish public ideas and swipe to express interest in building together or to skip. The detailed MVP, architecture, and launch plan are not approved. Development is blocked until explicit approval.

Last updated: 2026-10-15.

## Confirmed Brief

- Explore a more efficient alternative to Committers.top, without restricting the product to commits or leaderboards.
- Consider developer discovery, collaboration, discussions, social experiences, and other creative uses of public GitHub data.
- Prefer Cloudflare wherever it provides a useful fit. Vercel is an optional frontend host, not a requirement.
- Other providers, including GCP and MongoDB Atlas, may be evaluated where justified. This is permission to compare options, not approval to provision services or incur charges.
- Build something that can demonstrate product judgment and engineering ability in interviews. The target interview role is unresolved.
- Discuss and finalize the product before developing it.
- Keep the agreed answers, rejected alternatives, and eventual PRD in this README.
- Selected direction: Build Circles for local developers, with a public idea forum and Tinder-like swipe discovery of ideas for collaboration.
- Locality is a user-selected city or metro area. Discovery is local-first and remote-friendly, rather than restricted to nearby collaborators.
- Every idea accepts build requests from any locality. There is no creator-selectable local-only mode; creators still approve membership.
- At launch, GitHub sign-in is required to post ideas or send build requests. There are no minimum commits, followers, or repository requirements; selected work evidence is optional.
- Anyone can read published ideas and their public discussion without signing in. Commenting requires GitHub sign-in, not circle membership.
- Accepted collaborators coordinate through built-in real-time circle chat. The user wants to avoid paid services; zero-cost operation is a design constraint, not a verified capacity claim.

## Decision Status

The confirmed brief and explicitly confirmed answers below are agreed. Everything marked proposed, hypothesis, candidate, or illustrative remains open for discussion. Earlier alternatives are retained for context, not as parallel MVP commitments.

| Decision | Status |
| --- | --- |
| Documentation and discovery before development | Confirmed |
| Cloudflare-first evaluation; Vercel optional | Confirmed preference; GCP, MongoDB Atlas, and other options may also be compared |
| Primary user and urgent problem | Local developers sharing ideas and finding people to build with; frequency and severity of the problem still need validation |
| Interview audience and success criteria | Open |
| Product direction and positioning | Build Circles selected; public idea forum plus swipe-to-build discovery; exact positioning remains open |
| Primary discovery object | A posted idea, not a developer profile |
| Meaning of local | User-selected city or metro area; no GPS required |
| Discovery and remote collaboration | Local-first; every idea accepts remote build requests; no local-only mode. Exact ranking and filters remain open |
| Right-swipe outcome and circle membership | Creator-reviewed build request; acceptance grants circle membership, not the swipe itself |
| Sign-in for posting and build requests | GitHub required at launch; no activity thresholds; optional work evidence |
| Reading and commenting access | Published ideas and public discussion are readable without sign-in; GitHub sign-in is required to comment, not circle membership |
| Private circle coordination | Built-in real-time group chat selected; private to the circle, not an external-only workspace or asynchronous-only thread |
| Meaning of an open developer directory | Open; public source data does not imply permission for unrestricted reuse |
| MVP scope, exclusions, and launch cohort | Open |
| Permissions, consent, retention, and deletion policy | Open; launch gate |
| Budget, time commitment, and deadline | Avoid paid services; no paid provisioning authorized. Quota-exhaustion behavior, launch workload, time commitment, and deadline remain open |
| Stack and infrastructure services | Proposed only |
| Implementation and publication to an issue tracker | Not authorized at this stage |

## Reference Analysis

The local Committers.top collector provides a useful baseline, not a recommended implementation to copy wholesale.

- Discovery searches users by location and sorts by followers. This is a sampled population, not a census of developers or a search ordered by contribution quality.
- Its GraphQL search also loads organizations and contribution aggregates for each user. Discovery and enrichment therefore share one expensive request path.
- The current local implementation sets `perPage = 2`, explicitly to avoid resource-limit errors involving contribution collections. At that setting, 1,000 search edges require at least 500 successful search requests, before retries, duplicate handling, or additional search windows.
- Retry handling restarts the outer search loop rather than resuming a durably saved cursor. It can repeat work after failures.
- Advancing search windows with a strict lower follower threshold can miss users tied at the boundary when a result window is exhausted. This requires a fixture-based check before treating it as a quantified coverage defect.
- The inspected CLI path collects a batch and emits a file. It does not provide a durable incremental ingestion state or a serving API in that path.
- No GitHub calls, credential checks, performance benchmarks, or changes to Committers.top were made during discovery.

**Engineering hypothesis:** Separate lightweight discovery, bounded enrichment, and cached serving. Prioritize opted-in and actively viewed entities instead of repeatedly rebuilding every profile. Verify gains against the same dataset, fields, freshness target, and credential budget before claiming a speedup.

**Product hypothesis:** A directory becomes more valuable when it helps someone take a useful next step. Finding a suitable collaborator or contribution opportunity may create more repeat value than comparing raw activity counts. This is unvalidated.

Security note: The reference README contains a token-shaped example. If it is or ever was a real credential, its owner should revoke and rotate it. Do not reuse it, test it, or copy it into AllDevs documentation.

## Product Directions

These are product judgments, not market-research findings. Build Circles was selected in discussion; other directions are not selected for the initial product. Names are working labels; availability and trademarks have not been checked.

| Direction | Primary user and outcome | Distinctive experience | Main risk | Initial judgment |
| --- | --- | --- | --- | --- |
| Builder Match | Developers seeking collaborators | Publish a project need; find opted-in builders with relevant work evidence and compatible availability | Two-sided cold start and stale availability | Earlier recommendation; not selected as the primary product |
| Contribution Concierge | Developers seeking meaningful open-source work | Shortlist suitable issues using interests, stated time budget, project responsiveness, and explicit prerequisites | Difficulty and maintainer capacity cannot be reliably inferred | Strong alternative with solo-user value |
| Maintainer Help Exchange | Maintainers needing specific help | Advertise scoped requests for reviews, docs, accessibility, releases, or implementation; match willing contributors | Maintainers may not have time to onboard contributors | Strong if a maintainer cohort is accessible |
| Proof-of-Work Passport | Developers explaining their work | Curate source-linked project stories, reviews, documentation, releases, and contributions into a shareable profile | Crowded category; API activity is not proof of competence | Useful acquisition feature; possibly a separate product |
| Repo Rescue | Communities sustaining useful projects | Find projects explicitly seeking co-maintainers or succession help | Inactivity alone does not mean abandonment or permission to take over | Distinctive, but supply validation first |
| Build Circles | Local developers sharing ideas and seeking collaborators | Public idea forum with right-swipe build requests, creator-approved membership, and left-swipe skip | Local density, creator responsiveness, moderation, and sustained participation | Selected direction; membership approval agreed, detailed lifecycle and MVP open |
| Developer Atlas | People exploring an ecosystem | Explore repositories, topics, and source-linked contributions rather than a universal developer score | Expensive coverage; privacy and weak repeat utility | Useful discovery layer, weak standalone wedge |
| Dependency Neighbors | Maintainers seeking shared-interest peers | Discover other projects using the same public dependencies and coordinate migrations or support | Dependency graphs are incomplete; usage is not endorsement | Technically interesting, narrower audience |
| Hackathon Team Draft | Hackathon participants | Assemble complementary, opted-in teams around availability and project goals | Episodic usage and partner-dependent distribution | Viable if event access exists |
| Developer Dating | Adults explicitly seeking relationships | Separate opt-in profiles with ordinary mutual-consent matching; GitHub identity is optional context | Safety, age assurance, sensitive data, and local network density | Not recommended as the initial product |

A public idea forum, swipe discovery, and built-in real-time circle chat are now part of the selected concept. The forum and swipe interface can be two views over the same ideas, not two separate communities. General-purpose social posting, unrelated direct messaging, voice/video calls, dating, hiring, and rankings remain separate, unapproved commitments. Tinder is an interaction reference, not a decision to build romantic matching.

### Confirmed Core Concept

- Local developers can publish ideas to a public forum.
- Other developers discover those ideas and swipe right to send a build request, or left to skip.
- The goal is collaboration around an idea, not a popularity contest or a universal developer ranking.
- The idea creator reviews build requests and chooses whom to accept. Acceptance grants circle membership; a swipe alone does not.
- Local means a user-selected city or metro area. Discovery prioritizes local ideas while supporting remote collaboration.
- Every idea accepts build requests from anywhere; creators cannot make an idea local-only. Request eligibility is not automatic acceptance or a guarantee of membership.
- Posting ideas and sending build requests require GitHub sign-in at launch, without a minimum contribution history. GitHub-linked work evidence is optional.
- Anyone can read published ideas and their public discussion. GitHub-signed-in developers can comment before joining a circle; commenting does not send a build request or grant membership.
- Accepted collaborators coordinate through built-in real-time circle chat, separate from the publicly readable idea discussion.
- Build-request visibility, moderation and safety restrictions, search-engine indexing, detailed circle lifecycle rules, and access to chat history after membership changes remain unresolved.
- A left swipe is a skip, not a confirmed public downvote; its persistence is unresolved.
- The forum and swipe view using the same underlying idea posts is a recommendation, not an approved implementation decision.

### Locality and Remote Participation

- Confirmed: use a city or metro area as the locality, not a GPS distance radius or precise address.
- Confirmed: local-first discovery, with every idea open to remote build requests. Locality affects discovery priority, not geographical request eligibility.
- Confirmed: no per-idea local-only option. Creator-selected local-only versus remote-welcome modes were considered and not selected.
- Open: discovery filters, how remote ideas are surfaced, metro boundaries, and compatibility factors such as meeting expectations or timezone overlap.
- Permission to submit a request is distinct from circle membership. GitHub sign-in is required; blocking, moderation, and closed/full-circle behavior still need decisions. Geography alone does not prevent a request.
- Creator approval remains mandatory. Remote-friendly does not require accepting every request, equal acceptance rates across localities, sharing contact details, or mandatory in-person attendance.
- A thin local feed must not silently override selected discovery filters. Any broader fallback and its presentation need an explicit decision.

### Proposed Core Loop

Post an idea with city or metro context -> discover ideas local-first, with remote collaboration supported -> send a build request -> creator accepts -> join the circle -> take a first concrete building step.

Posting, public reading, GitHub-signed-in public commenting, right-swipe build requests, creator-approved membership, left-swipe skip, and real-time circle chat are agreed interactions. Request withdrawal, expiry, team capacity, chat scope and retention, progress tracking, and the first-step milestone still need decisions.

**Product hypothesis:** Idea-first discovery can help local developers turn shared interests into an actual collaboration. Test this by tracking mutually agreed first working sessions or other explicitly chosen building outcomes, rather than swipe volume alone.

### Proposed Positioning

**AllDevs helps local developers find an idea worth building and people to build it with.**

Example: A developer posts an accessibility-tool idea in their local community. Another developer discovers it in the forum or swipe view and swipes right to send a build request. The creator reviews the request; if accepted, the interested developer becomes a circle member.

The Build Circles direction, city/metro locality model, and local-first, remote-friendly approach are selected. This exact positioning, launch city or metro, experience level, and technical community remain open.

### Why Someone Might Choose This

- GitHub already shows code, profiles, issues, and discussions. AllDevs must improve a specific discovery-to-action workflow, not merely copy those surfaces.
- The proposed distinction is local, idea-first collaboration rather than swiping on developer popularity. Whether that improves outcomes must be validated.
- Work evidence can make introductions more contextual; explicit intent and availability supply information GitHub activity does not establish.
- An explainable match with source links is more defensible than a universal developer score or unsupported AI claims about personality or ability.
- Initial comparisons should include GitHub-native workflows, contributor-discovery tools, portfolio products, and existing community groups. No uniqueness or competitive superiority has been established.

## Public Data and Its Limits

| Signal | Potential use | Important limit |
| --- | --- | --- |
| Public profile fields and links | Identity context and an owner-approved profile | Often missing, stale, or personal; do not assume contact consent |
| Repositories, descriptions, topics, and languages | Project and interest discovery | A repository language is not a verified skill level; forks and generated content distort counts |
| Public pull requests and reviews | Link to examples of work and collaboration | Attribution, bot activity, context, and permissions matter; counts do not establish quality |
| Issues and discussions | Find project needs and public technical context | A label is not a guarantee of difficulty, responsiveness, or willingness to mentor |
| Releases and public maintenance activity | Show recent observable project activity | Do not infer a person's employment, health, burnout, or availability |
| Contribution aggregates | Optional contextual activity summaries | Private work is missing or only represented by limited aggregates; inactivity is not incompetence |
| Stars, follows, and public organizations | Optional discovery hints | Popularity and affiliation are not endorsements or permission to contact |
| AllDevs-declared interests, goals, timezone, and availability | Consent-based matching | These are first-party declarations, not facts inferred from commit timestamps or location text |
| AllDevs idea posts and build interest | Local idea discovery and collaboration | First-party content; a swipe does not establish membership, rights to an idea, or permission to contact someone off-platform |

Proposed safeguards, subject to a concrete policy review:

- Start with people who explicitly join and approve their AllDevs profile; curated public project links can supply useful context without pre-populating a personal-data directory.
- Separate identity verification, permission to import data, permission to publish it, and permission to receive introductions.
- GitHub sign-in verifies control of a GitHub account, not a legal identity, expertise, or permission to publish everything that account can access.
- Store source URLs, observation times, provenance, and completeness indicators. Distinguish missing evidence from zero activity.
- Request minimum permissions. Public-only ingestion must not accidentally import private repositories or organizations accessible through an authorized token.
- No email harvesting, recruiter contact-list sales, unsolicited bulk outreach, inferred sensitive traits, precise-location inference, or ranking purchases.
- An open-source implementation is not the same as an openly downloadable database of personal information. A bulk personal-data export is not proposed for the MVP.
- Provide visibility controls, correction, block, report, deletion, and do-not-reimport handling. Determine retention periods, cache invalidation, and backup expiry before launch.
- Romantic matching, if ever pursued, must be separate, adults-only, explicitly opted into, and reviewed for safety and legal obligations. Never repurpose directory profiles into dating profiles.
- Published ideas and public discussion are readable without sign-in; GitHub sign-in is required to comment. Define editing/deletion, reporting, moderation, and content permissions before launch. Posting an idea publicly must not be presented as transferring ownership, granting a code license, or guaranteeing confidentiality.
- Use a user-selected city or metro area rather than precise location tracking; GPS is not required. Public visibility of profile locality and build interest, build-request visibility, and contact sharing remain decisions to resolve. Public comments must not be used to expose private request or contact details.
- API access is not blanket permission to republish, resell, train models on, or retain user information. GitHub terms and applicable privacy requirements remain a launch gate; this document is not legal advice.

## GitHub Feasibility Constraints

- Search provides up to 1,000 results per query; a result total does not prove a complete dataset. Partitioning and deduplication need coverage checks and must not be used to evade platform limits.
- REST search has endpoint-specific rate limits. The currently documented REST user-search endpoint does not accept authentication; do not assume general authenticated-search quotas apply to it. Validate the selected endpoint and credential mode before sizing discovery.
- GraphQL generally allows 5,000 points per hour per user, but the available budget depends on authentication, installation, and enterprise context. A request is not necessarily one point.
- Secondary limits, timeouts, partial results, node limits, and expensive nested connections can bind before the headline hourly limit.
- Never treat user tokens as a pool for evading quotas. Respect retry guidance, shared budgets, and permitted use.
- GitHub App webhooks can reduce polling for installed and authorized repositories. They do not provide a global event stream for every GitHub developer or repository.
- Public event feeds are not a complete historical ledger. Third-party archives, if later evaluated, need their own coverage, freshness, licensing, privacy, and cost assessment.
- Stable GitHub IDs, not changeable usernames alone, should anchor deduplication. Account renames, deletions, changed visibility, and stale references require explicit behavior.

## Proposed Cloudflare Architecture

Choose services after agreeing on the product and workload. Cloudflare-first does not mean using every Cloudflare product.

With Build Circles selected, first-party ideas, discovery actions, and collaboration state are the core workload. GitHub sign-in is required for posting and build requests, while selected work evidence is optional; neither requires crawling a global developer directory. The earlier ingestion analysis remains background for any approved GitHub enrichment. The specific GitHub integration, permissions, session handling, and token retention still require design review.

| Responsibility | Candidate | Reason and boundary |
| --- | --- | --- |
| Public API and GitHub integration | Workers | Short, bounded requests; credential handling remains server-side |
| Profiles, consent, ideas, build interest, circles, and optional sync state | D1 | Relational source of truth with indexed queries; validate database size and write throughput against the workload |
| Background enrichment | Queues with Worker consumers | Bounded tasks, retries, idempotent upserts, dead-letter handling; assume duplicate delivery |
| Due-work scheduling | Cron Triggers | Enqueue a bounded set of refresh tasks, not one giant crawl |
| Shared upstream budget coordination | Durable Object if needed | Serialize a shared credential's budget across consumers; add only if ordinary bounded scheduling is insufficient |
| Public derived responses | Cache API; KV only if justified | Cache only approved public data; eventual consistency must never decide consent or visibility |
| Minimal snapshots or permitted exports | R2 if needed | Retention-controlled object storage, not an indefinite archive of personal data |
| Abuse controls | Turnstile and application-level limits | Protect onboarding and introductions; not a replacement for authorization or moderation |
| Frontend | Cloudflare static assets / Workers or Vercel | Cloudflare can host the frontend too; Vercel is reasonable if framework ergonomics justify another platform |
| Semantic retrieval | Workers AI and Vectorize, later | Only after a keyword/filter baseline shows a measured need and data-use review permits it |
| Real-time circle chat | SQLite-backed Durable Objects with WebSocket Hibernation | Recommended candidate now that real-time chat is selected; a room per circle isolates coordination, but quotas, membership authorization, history storage, and recovery must be validated |

Proposed ingestion flow: approved profile or curated project -> lightweight identity discovery -> durable bounded task -> permitted enrichment -> normalized source-linked evidence -> derived search views -> cached public response.

Proposed reliability properties: idempotency, durable progress, retry backoff with jitter, upstream-budget awareness, job deduplication, stale-data labels, and repairable partial failures. Deletion must also suppress future ingestion and invalidate downstream copies.

Do not expose GitHub tokens in browser code, public logs, documentation, or queue payloads. A Vercel/Cloudflare split also requires an explicit session, CSRF, cookie, origin, and CORS design; CORS alone is not authorization.

### Real-Time Chat and Zero-Cost Target

**Confirmed product decision:** Built-in real-time circle chat, rather than an asynchronous-only thread or external-only workspace. This selects the experience, not a vendor, an unlimited traffic guarantee, or the full chat feature set.

**Cost constraint:** The user wants to avoid paying for services. Do not enable a paid plan, assume overages are acceptable, or use temporary credits as evidence of sustainable zero-cost operation. A free-tier pilot is plausible, not yet validated. Quota exhaustion, traffic spikes, abuse, and growing message history must have an explicit operating policy.

Official documentation checked on 2026-10-15:

| Candidate | Free-tier evidence | Important boundary | Recommendation |
| --- | --- | --- | --- |
| Cloudflare Workers plus SQLite-backed Durable Objects | Durable Objects are available on Workers Free, including WebSocket Hibernation. Documented free DO allowances include 100,000 requests/day, 13,000 GB-s duration/day, 5 million SQL rows read/day, 100,000 SQL rows written/day, and 5 GB account storage | These are account allowances, not per-circle quotas or supported-user counts. Workers have their own quotas; indexes, metadata, retries, history reads, and non-chat features consume resources. Operations fail when relevant free limits are exceeded | First candidate to validate for a bounded pilot; no paid Workers subscription is inherently required for this candidate |
| GCP Cloud Run | Request-based free allowances include 180,000 vCPU-seconds, 360,000 GiB-seconds, and 2 million requests/month, applied using the documented regional pricing rules | Active long-lived requests consume compute allocation. Network transfer, builds, image storage, and external coordination may add cost; free quotas are not a zero-spend cap | Keep as an alternative if measurements justify it, not a way to assume WebSocket sessions cost nothing |
| MongoDB Atlas Free | Documented limits include 0.5 GB storage including indexes, 500 database connections, 100 operations/second, and rolling seven-day transfer limits of 10 GB in and 10 GB out | A database connection is not a chat user or a WebSocket allowance. Atlas Free does not supply the application's WebSocket server, automatic storage expansion, or managed backups | Optional database alternative, not needed alongside D1/DO storage without a concrete requirement |

Proposed Cloudflare-first design, not approved implementation:

- Use Workers for GitHub sessions, APIs, and WebSocket admission; D1 remains a candidate for profiles, ideas, public comments, membership, and build requests.
- Use one SQLite-backed Durable Object per circle for real-time room coordination and, if selected, durable chat history. Do not duplicate every message into another database without a real need.
- Use the Hibernation WebSocket API so idle rooms can keep connections without remaining active. Timers, pending work, and ordinary non-hibernating sockets can defeat this saving; hibernation does not make active message handling or storage free.
- The documented 20:1 incoming-WebSocket-message ratio applies to request billing, not SQL writes, runtime limits, or guaranteed message capacity. Outgoing frames have no DO request charge, but fan-out still consumes work and must be bounded.
- Check membership server-side for connections, message operations, and history access. Design revocation for already-connected members, session expiry, room deletion, and administrative moderation; admission checks alone are insufficient.
- Define message IDs, persistence acknowledgments, deduplication, bounded history pagination, reconnect catch-up, and backpressure. Deployments can disconnect sockets; do not claim exactly-once delivery or uninterrupted connections.
- Recommend text-first chat with bounded message sizes, rate limits, active connections, room sizes, and history retention. Attachments, presence, typing indicators, read receipts, DMs, voice/video, and push notifications remain unapproved and need separate cost estimates.
- Do not split across providers just to accumulate free quotas. Cross-provider latency, credentials, egress, consistency, and operations may cost more than the apparent savings. Follow provider terms rather than rotating accounts or evading limits.

**Illustrative sizing, not a supported workload:** 500 daily active users sending 20 messages each means 10,000 new messages/day. At three stored-row writes per message including indexes, this alone would use roughly 30,000 writes/day, before other writes. At 1 KB per stored message, 30 days is roughly 300 MB of raw messages before indexes, metadata, edits, or backups. Connection churn, history reads, active room duration, fan-out, and abuse can exhaust a different allowance first. No concurrency or free-capacity claim is established by this arithmetic.

Before choosing a provider, agree on daily active users, simultaneous connections, concurrently active circles, messages/day and peak rate, average message size, recipient fan-out, history reads, retention, and allowed interruption. Then compare measured usage against every relevant allowance with headroom.

## What Efficient Must Mean

Agree on measurable targets before choosing implementation tactics:

- Upstream API requests and GraphQL points per successfully refreshed profile or project.
- Coverage and completeness of the declared cohort, including low-follower users and pagination boundaries.
- Freshness by tier, with an explicit last-observed time rather than a misleading real-time claim.
- End-user response latency and cache hit rate, measured separately from upstream ingestion time.
- Retry amplification, duplicate work, partial failures, and time to recover a stalled job.
- Database rows scanned/written, stored bytes, queue operations, and actual monthly spend.
- Deletion completion time and prevention of reappearance from stale tasks or caches.
- For chat: delivery and acknowledgment latency, reconnect recovery, active room duration, concurrent connections, fan-out, history-read/write amplification, retention growth, and quota headroom. Platform scalability and zero-cost capacity are different claims.

**Illustrative sizing, not a forecast:** 10,000 profiles refreshed once per week would average about 1,429 profile refreshes per day. At three upstream requests per refresh, that is about 4,286 requests per day, excluding discovery, pagination, retries, and deep evidence retrieval. Measure query cost and burst limits before declaring this viable; daily averages do not establish quota compliance.

**Budget target:** Avoid paid services for the pilot. Cloudflare's Workers paid-plan minimum of USD 5/month describes an optional upgrade, not a prerequisite for SQLite-backed Durable Objects on Workers Free and not an approved purchase. D1, queues, storage, AI, observability, email, domains, Vercel, and any alternative provider must be modeled separately. No all-in free-tier guarantee has been established. Set application limits and quota headroom; billing alerts are not hard spending caps. Whether to throttle or pause chat rather than pay when limits approach is the next open decision.

## Proposed First Release

This is a discussion draft for the selected Build Circles direction, not an approved MVP.

1. Read published ideas and public discussion without signing in. Sign in through GitHub to post ideas, comment, or send build requests; select a city or metro area without requiring GPS and explicitly approve profile visibility. Selected work evidence is optional; no minimum commits, followers, or existing repository are required.
2. Post an idea to the public forum. Proposed post details include the problem, intended outcome, help wanted, and expected commitment; required fields remain open.
3. Discover ideas local-first through forum browsing and a swipe view over the same posts; every idea accepts remote build requests. Public reading and GitHub-signed-in commenting do not require circle membership. Exact filters and reaction behavior remain open.
4. Swipe right to send a build request, or left to skip. Provide equivalent accessible buttons; persistence, undo, and request limits remain open.
5. The creator reviews build requests and accepts collaborators into the circle. A right swipe alone grants neither membership nor contact access. Team capacity, review deadlines, withdrawal, and later membership changes remain open.
6. Coordinate through built-in private real-time circle chat, agree on a first concrete building step, and record whether it happened. Chat feature scope, history retention, membership-change behavior, and quota policy remain open. An existing GitHub repository is not required for posting an idea.
7. Manage idea and profile visibility, report content, block abuse, and request deletion under a defined retention policy.

Proposed exclusions: a global census, a universal developer score, recruiter data exports, private-repository ingestion, dating, a general-purpose social feed unrelated to ideas, unrelated direct messaging, voice/video calls, payments, and an autonomous AI matching agent. The public idea forum and real-time circle chat are selected features, not exclusions. Attachments and other chat enhancements remain unapproved.

## Validation Before Development

**Product test:** After selecting a locality and target cohort, manually offer idea posting and build-interest discovery to a small consenting group. Proposed pilot: interview 10 local developers, collect concrete recent examples of failed or successful collaboration, share their approved idea posts, and facilitate several permissioned connections without building the app. Agree on pass/fail thresholds first. If users swipe but do not agree on a first building step, reconsider whether swipe discovery solves the problem.

**Cold-start test:** Identify one reachable local community and a credible recruitment channel with both idea creators and willing builders. An empty worldwide network is not a launch plan. Measure whether enough relevant ideas and responsive people exist in the same locality before expanding it.

**Technical test, only after authorization:** Compare a lightweight-discovery/enrichment pipeline with the reference collector on the same permitted cohort. Record calls, points, errors, duplicates, completeness, elapsed time, freshness, and cost. More concurrency alone is not an efficiency improvement.

**Chat test, only after authorization:** Benchmark the agreed workload and bursts, not an unspecified number of users. Measure request/compute/storage usage, hibernation behavior, fan-out, reconnect recovery, duplicate sends, persistence failures, and history pagination. Test a revoked member with a live socket, unauthorized room/history access, session expiry, deploy-induced disconnects, a slow receiver, and reaching each quota. Do not report a failed persistence operation as a successfully saved message. Record both cost and availability before claiming a zero-cost capacity.

**Trust test:** Walk through a new user, a low-activity developer, a renamed account, a bot, a deletion request during an in-flight refresh, a revoked authorization, a blocked sender, and a project that becomes private. For Build Circles, also examine an idea receiving 100 interested builders, an unresponsive creator, repeated unwanted requests, a full circle, harmful public content, and a deleted idea with pending interest. Verify that a remote builder can request to join an otherwise eligible idea, that location alone does not block the request, and that only creator acceptance grants membership.

**Outcome measurement:** For Build Circles, consider circles that reach a mutually agreed first working session or verifiable building outcome, with explicit attribution limits. Define formation and success before counting them. Sign-ups, swipes, posted ideas, stars, and page views are supporting metrics, not proof of useful collaboration.

## Interview Evidence

No project guarantees interview success. A stronger story combines a real user problem, observed adoption, explicit trade-offs, and measured engineering outcomes.

- Product: explain the chosen user, rejected alternatives, validation evidence, activation funnel, and scope decisions.
- Engineering: demonstrate quota-aware ingestion, idempotent processing, provenance, privacy controls, deletion propagation, and failure recovery.
- Operations: show measured latency, data freshness, error budgets, unit costs, and behavior under upstream throttling.
- Integrity: publish honest limitations. Do not boost the creator's ranking or imply that GitHub counts determine professional worth.

## Discussion and Approval Process

Use the grill-with-docs workflow: ask one decision-driving question at a time, provide a recommendation, challenge concrete edge cases, and record the user's answer here. Do not silently promote a recommendation into an agreement.

Resolve decisions in dependency order: primary user and problem; interview objective; first cohort and distribution; action loop; consent/data boundary; MVP and exclusions; validation metrics; time and budget; architecture and module ownership; testing; launch and moderation obligations.

Keep agreed terminology in [CONTEXT.md](CONTEXT.md). Use ADRs only for consequential, hard-to-reverse trade-offs that require context. Keep the README as the self-contained product decision record.

After discovery, synthesize the agreed answers using the to-prd structure. Confirm the proposed module boundaries and testing priorities with the user before marking the PRD ready. Do not publish an issue or apply tracker labels until a repository, issue tracker, and publication approval exist.

### Final PRD Outline

- Problem Statement: chosen user's concrete problem and supporting evidence.
- Solution: approved core workflow and positioning.
- User Stories: numbered stories covering the approved workflow, negative cases, privacy, moderation, and operations.
- Implementation Decisions: approved module boundaries, interfaces, data contracts, permissions, and architecture trade-offs.
- Testing Decisions: observable behavior, agreed coverage, acceptance criteria, and failure scenarios.
- Out of Scope: explicit exclusions and deferred directions.
- Further Notes: launch plan, metrics, operating costs, dependencies, and unresolved risks.

### Approval Gate

Development starts only when the user approves the product direction and PRD, the launch cohort and validation criteria are defined, data-use requirements are reviewed, and time/budget/testing expectations are agreed. Open questions must be explicitly resolved or accepted as bounded risks.

### Answer Log

**Q1: Whose problem should AllDevs solve first?**

Confirmed answer, 2026-10-14: Build Circles. Local developers post ideas to a public forum. Others swipe right to express interest in building together or left to skip, using a Tinder-like discovery interaction.

This selects an idea-first local collaboration product, not the earlier profile-first Builder Match recommendation. It does not approve dating, automatic circle membership, precise location tracking, or development.

**Q2: What does a right swipe do?**

Decision recorded, 2026-10-14: The user's "Fair point" is taken as agreement with the recommended creator-reviewed build request. A right swipe sends a request; the idea creator chooses collaborators, and acceptance grants membership. It is not immediate joining or merely a bookmark. This interpretation was stated explicitly in the conversation and can be corrected.

Reason: one idea may receive 100 requests while its creator only needs two collaborators. Keep the request lightweight rather than turning collaboration into a job application. Required request fields, team capacity, review deadlines, and request expiry are not yet decided.

**Q3: What does local mean for discovery?**

Confirmed answer, 2026-10-15: The user selected both "City or metro area" and "Local-first, remote-friendly." Use a user-selected city or metro area without requiring GPS, prioritize local ideas, and support remote collaboration. This is not a local-only network.

Exact ranking, remote discovery controls, and the launch locality remain open. Q4 below resolves per-idea remote eligibility. Remote-friendly does not imply automatic membership or permission to contact someone off-platform.

**Q4: Can an idea creator choose whether remote collaborators may join?**

Confirmed answer, 2026-10-15: "Always remote-friendly." Every idea accepts build requests from anywhere; there is no per-idea local-only mode. Discovery remains local-first, and the creator still decides whom to accept.

The earlier recommendation to offer creators local-only versus remote-welcome modes was not selected. Remote access to requests is not guaranteed admission, a bypass of blocking/moderation, or a requirement to accept requests after a circle closes; those lifecycle rules still need decisions.

**Q5: Is a GitHub account required to post ideas or send build requests?**

Confirmed answer, 2026-10-15: The user selected A, GitHub required. GitHub sign-in is required to post ideas or send build requests at launch. No minimum commits, followers, or existing repository are required, and work evidence is optional. Email-only sign-in was not selected for launch.

This keeps identity integration focused but excludes people without GitHub accounts unless they create one. GitHub sign-in does not verify competence, legal identity, or good behavior, and does not authorize broad private-data access. Q6 below resolves public reading and commenting; additional anti-abuse rules remain open.

**Q6: Who can read and discuss public idea posts?**

Confirmed answer, 2026-10-15: The user selected A, public discussion. Anyone can read published ideas and their public discussion without signing in. GitHub-signed-in users can comment without joining the circle, so they can ask questions and refine an idea before committing to build it.

Commenting is distinct from sending a build request or becoming a member. Member-only commenting was not selected. This does not approve exposing request details, personal contact information, or private circle coordination. Moderation and search-engine indexing remain open; Q7 below resolves the private coordination experience.

**Q7: Where should accepted circle members coordinate?**

Confirmed answer, 2026-10-15: Built-in real-time chat for accepted circle members. The asynchronous-only recommendation and external-only coordination were not selected. The user wants to avoid paid services and permits evaluating GCP, Cloudflare, MongoDB, and other options; vendor choice and traffic capacity are not finalized.

The experience is selected, but free operation at arbitrary scale is not established. Provider quotas, usage measurements, bounded chat scope, retention, authorization, and operating behavior at quota exhaustion still need decisions. This answer does not authorize starting development, provisioning infrastructure, or spending money.

**Q8: What should happen if free-tier limits are approached or exhausted?**

Unanswered. Recommendation: enforce a hard zero-spend pilot, with proactive application limits and clear throttling or temporary unavailability instead of unapproved charges. An alternative is to seek explicit approval for a small paid upgrade to preserve availability. Until the user changes the constraint, paid provisioning and overages are not authorized; alerts alone are not a spending cap.

## Sources

Official GitHub and initial Cloudflare documentation consulted on 2026-10-14; real-time chat pricing and limits checked on 2026-10-15. Pricing, endpoint behavior, and quotas can change. The general acceptable-use and API terms do not constitute product-specific approval.

- Local Committers.top implementation: `github/github.go`, `top/top.go`, and `main.go` in the adjacent reference project.
- [GitHub GraphQL rate and query limits](https://docs.github.com/en/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api)
- [GitHub REST search endpoints and limitations](https://docs.github.com/en/rest/search/search)
- [GitHub acceptable-use policies, especially information usage and privacy](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)
- [GitHub API terms: review before finalizing the data model](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#h-api-terms)
- [Cloudflare Workers and related service pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare Durable Objects pricing and free allowances](https://developers.cloudflare.com/durable-objects/platform/pricing/)
- [Cloudflare Durable Objects limits](https://developers.cloudflare.com/durable-objects/platform/limits/)
- [Cloudflare WebSocket Hibernation and deployment disconnects](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)
- [GCP Cloud Run pricing](https://cloud.google.com/run/pricing)
- [MongoDB Atlas Free cluster limits](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/)