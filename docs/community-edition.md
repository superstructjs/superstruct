# Superstruct Community Edition

The original Superstruct was created by [@ianstormtaylor](https://github.com/ianstormtaylor) in November 2017, reaching the big one-point-zero release in November 2022. It is an elegant and light-weight validation library that still gets good use by the developer community (approx 1M downloads/week on npm). It really was ahead of its time — it was created in the times of TypeScript 2.6 (!), and almost 2.5years before the first commit of the similar, now massively popular validation library [Zod](https://github.com/colinhacks/zod).

Unfortunately, since v1.0.3, activity on the project has paused. As Ian seems to be the sole maintainer, new PRs are left unmerged, and open issues linger without an authoritative answer.

I tried reaching out to Ian to offer my help with Superstruct's maintenance (I've had some minor PRs on the project in the past), but I haven't received a response.

Before I continue, I want to be clear: I pass no judgement here — life happens and open source can be tough! People are free to take a break, or even stop contributions completely if they want to. :v: I hope Ian is OK and his decision to take time off was made on his own terms.

I use Superstruct in almost every project of mine, so the lack of maintenance has, over time, become a problem. Even trivial bugs can become a blocker if they cannot be fixed. And, when picking up new projects, it feels wrong to go for a library that doesn't have active maintenance. However, after thorough research, I still think that Superstruct is the best at what it does.

So, I concluded that the best path forward is to create a community fork of the project. I hope that we, the community that has benefited from Ian's awesome work, can now collaboratively build on top of it in his absence.

The plan is as follows:

1. Release the superstruct@1.0.3 under @superstruct/core. This should allow people to migrate easily by simply switching imports.
2. Start merging in existing PRs and addressing opened issues in the original repo. These will be added to the @superstruct/core package and will follow semver.
3. Through step 2, attempt to find people who would be willing to co-maintain the package to try to prevent the current situation from happening again. If you're interested, please let me know at me@arturmuller.com or via Mastodon at https://indieweb.social/@artmllr
4. Make the project easier to contribute to for newcomers:
	- Annotate the codebase
	- Switch dev tooling to more common/contemporary options
	- Update documentation to include more examples and deeper dives


---

I would love it if you join me in supporting the project! GitHub stars, issues, PRs, all extremely welcome!

—Art :vulcan_salute:
