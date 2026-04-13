#!/usr/bin/env python3
"""FTP deploy script for kargu.ee -> Zone.ee"""
import ftplib
import os
import sys

FTP_HOST = os.environ.get('FTP_HOST', 'kargu.ee')
FTP_USER = os.environ.get('FTP_USER', '')
FTP_PASS = os.environ.get('FTP_PASS', '')
SERVER_DIR = '/htdocs'

SKIP = {'.git', '.github', 'node_modules', '.DS_Store', '.gitignore', 'deploy.py'}


def ensure_dir(ftp, path):
    try:
        ftp.mkd(path)
    except Exception:
        pass


def upload_dir(ftp, local_path, remote_path):
    ensure_dir(ftp, remote_path)
    for item in sorted(os.listdir(local_path)):
        if item in SKIP:
            continue
        if item.startswith('.') and item != '.htaccess':
            continue
        local_item = os.path.join(local_path, item)
        remote_item = remote_path + '/' + item
        if os.path.isdir(local_item):
            upload_dir(ftp, local_item, remote_item)
        else:
            with open(local_item, 'rb') as f:
                ftp.storbinary('STOR ' + remote_item, f)
                print('  Uploaded: ' + remote_item)


def main():
    print(f'Connecting to {FTP_HOST}...')
    ftp = ftplib.FTP()
    ftp.connect(FTP_HOST, 21, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    print('Logged in OK')
    upload_dir(ftp, '.', SERVER_DIR)
    ftp.quit()
    print('Deploy complete!')


if __name__ == '__main__':
    main()
