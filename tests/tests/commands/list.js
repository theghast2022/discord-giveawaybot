let assert = require('./../../helpers/assert'),
    codes = require('./../../../utils/codes'),
    Store = require('./../../../utils/store'),
    makeMessage = require('./../../helpers/message'),
    test = require('./../../helpers/testBase');

/**
 * Note : we don't test visibility-by-permission logic because there currently isn't an easy way to pass info about
 * nr. of visible items back to our testing code.
 */

test('list command', function(testBase){

    it('should reject a list command with too many args', async function() {
        let store = await Store.instance();
        // force a give away to ensure we enter the per-giveaway loop and cover as much as code as possible
        store.setRecords([{
            created : new Date().getTime(),
            participants : []
        }]);

        let message = makeMessage(testBase.client.user.id);
        message.content += 'list abc def';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_REJECTED_INVALIDARGUMENTS, result);
    });

    it('should reject a list command with argument that is not ´all´', async function() {
        let store = await Store.instance();
        // force a give away to ensure we enter the per-giveaway loop and cover as much as code as possible
        store.setRecords([{
            created : new Date().getTime(),
            participants : []
        }]);

        let message = makeMessage(testBase.client.user.id);
        message.content += 'list abc';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_REJECTED_INVALIDARGUMENTS, result);
    });

    it('should accept a list command', async function() {
        let store = await Store.instance();
        // force a give away to ensure we enter the per-giveaway loop and cover as much as code as possible
        store.setRecords([{
            created : new Date().getTime(),
            participants : []
        }]);

        let message = makeMessage(testBase.client.user.id);
        message.content += 'list';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_ACCEPTED, result);
    });

    it('should accept a list all command', async function() {
        let store = await Store.instance();
        // force a give away to ensure we enter the per-giveaway loop and cover as much as code as possible
        store.setRecords([{
            created : new Date().getTime(),
            participants : []
        }]);

        let message = makeMessage(testBase.client.user.id);
        message.content += 'list all';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_ACCEPTED, result);
    });
});