#!/usr/bin/env node

const { spawn } = require('child_process')
spawn('electron',['.'],{stdio:"inherit"});

