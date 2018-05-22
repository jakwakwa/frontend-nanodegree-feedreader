/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* a test suite. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url defined and not empty', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                const element = allFeeds[i];
                expect(element.url).toBeDefined();
                expect(element.url).not.toBe('');
            }
        });

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has a name defined and not empty', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                const element = allFeeds[i];
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('');
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        it('is hidden by default', function () {
            var bodyDiv = $('body');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(true);
        });
        /* a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('changes visibility when menu icon is clicked', function () {
            var menuButton = $('.menu-icon-link');
            var bodyDiv = $('body');

            menuButton.trigger('click');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(false);

            menuButton.trigger('click');
            expect(bodyDiv.hasClass('menu-hidden')).toBe(true);
        })
    });

    /* a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('at least single entry in feed container when loadFeed function is called', function () {
            var entry = $('.entry');
            var feed = $('.feed');
            expect(entry.length).toBeGreaterThan(0);
        });
    });

    /* a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        var oldFeed;
        var newFeed;

        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function () {
                legacyFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('content changes when loadFeed has run', function () {
            newFeed = $('.feed').html();
            expect(legacyFeed).not.toBe(newFeed);
        });

    });

}());
