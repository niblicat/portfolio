<script>
    import Article from '$lib/blocks/article.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
    <title>Melon Merge 3D</title>
    <meta
        name="description"
        content="Melon Merge 3D is a mobile puzzle game available on the Android and iOS marketplaces."
    />
</svelte:head>

<Article class="m-4 mx-auto max-w-4xl" tag="article">
    <h1>Melon Merge 3D</h1>

    <p>
        Melon Merge 3D is a physics puzzle game where you combine fruits into increasingly larger
        fruits. It was created mobile-first with the goal of designing the best fruit merging game
        on both major app stores. The game has been downloaded over 300 times across the App Store
        and Google Play Store.
    </p>

    <div
        id="download"
        class="mx-auto my-4 flex max-w-4xl flex-row flex-wrap justify-center gap-2 *:h-12 sm:gap-4 sm:*:h-16 md:justify-around"
    >
        <Button
            variant="badge"
            size="lg"
            href="https://apps.apple.com/us/app/melon-merge-3d/id6708230921"
            class="p-0"
        >
            <img
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1730678400"
                alt="Download on the App Store."
                class="h-full object-cover"
            />
        </Button>
        <Button
            variant="badge"
            size="lg"
            href="https://play.google.com/store/apps/details?id=net.nibli.merge3d"
            class="p-0"
        >
            <img
                src="/content/images/google-play.png"
                alt="Get it on Google Play."
                class="h-full object-cover"
            />
        </Button>
    </div>

    <h2>Early Development</h2>

    <img
        src="/content/images/melon-early.jpg"
        alt="Game screenshot of a prototype version of Melon Merge 3D."
        class="mx-auto! max-w-32 rounded-lg shadow-xs sm:float-right sm:m-4! sm:inline"
    />

    <p>
        Miles Wilson and I developed the game as part our final project of our Game Design,
        Development, and Technology course. This course involved learning software development
        workflows, Unity & C#, and game development fundamentals.
    </p>
    <p>
        The core gameplay loop was finalized during this period. Players expressed that this
        iteration sufficed as an engaging gameplay experience. The presentation, not so much.
    </p>

    <h2>Taking It Further</h2>

    <p>
        After finishing my junior year, I alone continued the development of Melon Merge 3D, aiming
        to improve the aesthetics and feedback of the game. Haptic feedback, particle effects, and
        improved physics were a must-have. Additionally, the fruits could no longer be spheres with
        a stock fruit texture slapped on.
    </p>
    <p>
        I learned Maya and brushed up on my Photoshop skills to model and paint the fruits and the
        background elements. I used Illustrator to design vector graphics like icons and UI
        elements. Fruits like the pineapple and cantaloupe took a few revisions until they looked
        just right, as I really wanted the fruits to look as fruity as possible. Overall, I'm quite
        proud of what I accomplished. Only a few visual assets, like the music and skybox, were not
        designed by me.
    </p>

    <h2>Release</h2>

    <img
        src="/content/images/melon-close.png"
        alt="Game screenshot of a recent version of Melon Merge 3D in which a pitcher is filled with fruits."
        class="mx-auto! max-w-32 rounded-lg shadow-xs sm:float-right sm:m-4! sm:inline"
    />

    <p>
        The next big hurdle was releasing the game on app stores. Releasing the game on the App
        Store was as challenging as registering and paying for an Apple Developer account and then
        publishing for approval on App Store Connect. However, releasing the game on the Google Play
        Store would prove to be a tougher challenge.
    </p>

    <p>
        Google instituted a 20-tester requirement to distribute on the play store. This meant I
        needed to find 20 people with an Android phone willing to download my game, play the game,
        and keep the game installed for two weeks. To find my testers, I asked professors if I could
        briefly preview my game during class time. Sure enough, after advertising the game in two
        classes, I had enough Android users to apply for distribution on the Google Play Store!
    </p>

    <h2>What Now?</h2>

    <p>
        Although the game is at a complete state, I wouldn't mind working on this project again.
        There are so many features I could add, like saves, a leaderboard, and new modes, but it's
        difficult to justify spending the time on those features over working on other projects or
        learning new skills. If I were to return to this project, I would also try refactoring many
        of the core systems, as they were not developed with future me's sanity in mind. We'll see
        if I return to Melon Merge 3D!
    </p>
</Article>
