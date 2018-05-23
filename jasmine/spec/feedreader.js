/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* I placed all of the tests within the $() function,
 * since some of these tests may require DOM elements. 
 * This ensures they don't run until the DOM is ready.
 */
$(function () {
    /* "RSS Feeds" test suite. 
    */
    describe('RSS Feeds', function () {
        /* The following tests will make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('variables are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* this test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url defined and not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        /* this test loops loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and not empty', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* "The menu" test suite */
    describe('The menu', function () {
        /* this test ensures the menu element is
        * hidden by default.
        */
        it('is hidden by default', function () {
            var bodyDiv = $('body');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(true);
        });
        /* this test ensures the menu changes
        * visibility when the menu icon is clicked. 
        */
        it('changes visibility when menu icon is clicked', function () {
            var menuButton = $('.menu-icon-link');
            var bodyDiv = $('body');
            /* does the menu display when clicked?
            */
            menuButton.trigger('click');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(false);
            /* does the menu hide when clicked again?
            */
            menuButton.trigger('click');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(true);
        })
    });

    /* "Initial Entries" test suite */
    describe('Initial Entries', function () {
        /* this test ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * loadFeed() is asynchronous.
        */
        // Avoid duplicated setup
        // Before loading feed
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('at least single entry in feed container when loadFeed function is called', function (done) {
            var numEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', function () {
        /* this test ensures when a new feed is loaded
        * by the loadFeed function that the content does actually change.
        * loadFeed() is asynchronous.
        */
        var oldFeed;
        var newFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('content changes when loadFeed has run', function () {
            newFeed = $('.feed').html();
            expect(oldFeed).not.toBe(newFeed);
        });

    });

}());
