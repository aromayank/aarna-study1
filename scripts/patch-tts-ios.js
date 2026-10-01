const fs = module.require('node:fs');
const path = module.require('node:path');

module.exports = function patchTtsPlugin(context) {
  const pluginSource = path.join(
    context.opts.projectRoot,
    'platforms',
    'ios',
    'App',
    'Plugins',
    'cordova-plugin-tts',
    'CDVTTS.m'
  );

  if (!fs.existsSync(pluginSource)) return;

  const source = fs.readFileSync(pluginSource, 'utf8');
  if (source.includes('speakOnBackgroundThread:command')) return;

  const methodSignature = '- (void)speak:(CDVInvokedUrlCommand*)command {';
  if (!source.includes(methodSignature)) {
    throw new Error('Unable to apply the Cordova TTS background-thread patch.');
  }

  const backgroundThreadMethod = `- (void)speak:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self speakOnBackgroundThread:command];
    }];
}

- (void)speakOnBackgroundThread:(CDVInvokedUrlCommand*)command {`;

  fs.writeFileSync(pluginSource, source.replace(methodSignature, backgroundThreadMethod));
};