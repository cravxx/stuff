import eyed3, os, logging
from beets.plugins import BeetsPlugin
from beets import ui
from beets.ui import Subcommand

logging.getLogger("eyed3.mp3.headers").setLevel(logging.CRITICAL)
logging.getLogger("eyed3.id3.tag").setLevel(logging.CRITICAL)

class NormalizeContainersPlugin(BeetsPlugin):

    def __init__(self):
        super(NormalizeContainersPlugin, self).__init__()
        self.register_listener('after_write', self.process_file)

    def commands(self):
        normalize = Subcommand('normalize', help='normalizes the tag containers to ID3v2.4 and ID3v1.0')
        normalize.parser.add_all_common_options()
        normalize.func = self.do_normalize
        return [normalize]

    def process_file(self, item):
        safe_path = item.path.decode('utf-8')
        self._log.info('processed {0}'.format(safe_path[safe_path.rindex("\\")+1:]))
        audio = eyed3.load(safe_path)
        try:
            audio.tag.save(version=eyed3.id3.ID3_V2_4,encoding='utf-8',preserve_file_time=True)
            audio.tag.save(version=eyed3.id3.ID3_V1,encoding='utf-8',preserve_file_time=True)
        except Exception as e:
            self._log.error("Error: {0}".format(e))
    
    def do_normalize(self, lib, opts, args):
        objs = []
        query = ui.decargs(args)
        if opts.album:
            [[objs.append(item) for item in album.items()] for album in lib.albums(query)]
        else:
            [objs.append(item) for item in lib.items(query)]
        for item in objs:
            self.process_file(item)

