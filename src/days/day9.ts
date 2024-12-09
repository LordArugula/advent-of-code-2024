type File = {
    id: number;
    size: number;
    offset: number;
    moved?: boolean;
};

export function part1(input: string): string {
    let filesystem: File[] = [];
    const diskmap = input.split("").slice(0, -1).map(blocksize => parseInt(blocksize));

    let diskSize = diskmap.reduce((offset, blockSize, index) => {
        if (index % 2 === 0) {
            filesystem.push({
                id: filesystem.length,
                size: blockSize,
                offset: offset,
            });
        }
        return offset + blockSize;
    }, 0);

    let checksum = 0;
    let fileId = 0;
    let offset = 0;
    let rOffset = 0;
    let rFileId = filesystem.length - 1;
    while (offset < diskSize - rOffset) {
        let file = filesystem[fileId];

        if (offset >= file.offset + file.size) {
            fileId++;
            file = filesystem[fileId];
        }

        if (offset < file.offset) {
            file = filesystem[rFileId];
            rOffset++;

            if (rOffset >= diskSize - file.offset) {
                rFileId--;
                rOffset += (file.offset - (filesystem[rFileId].offset + filesystem[rFileId].size));
            }
        }

        checksum += file.id * offset;
        offset++;
    }

    return checksum.toString();
    return ":3";
}

export function part2(input: string): string {
    let filesystem: File[] = [];
    const diskmap = input.split("").slice(0, -1).map(blocksize => parseInt(blocksize));

    let diskSize = diskmap.reduce((offset, blockSize, index) => {
        if (index % 2 === 0) {
            filesystem.push({
                id: filesystem.length,
                size: blockSize,
                offset: offset,
            });
        }
        return offset + blockSize;
    }, 0);

    for (let rFileId = filesystem.length - 1; rFileId >= 0; rFileId--) {
        let lastFile = filesystem[rFileId];
        if (lastFile.moved === true) {
            continue;
        }

        let fileId = 0;
        let offset = 0;
        while (offset < lastFile.offset) {
            let file = filesystem[fileId];
            if (offset >= file.offset + file.size) {
                fileId++;
                if (fileId >= filesystem.length) {
                    break;
                }
                file = filesystem[fileId];
            }

            if (offset < file.offset) {
                if (lastFile.size <= file.offset - offset) {
                    lastFile.offset = offset;
                    lastFile.moved = true;
                    filesystem.sort((a, b) => a.offset - b.offset);
                    rFileId++;
                    break;
                }
            }
            offset++;
        }
    }

    let checksum = 0;
    let fileId = 0;
    let offset = 0;
    while (offset < diskSize) {
        let file = filesystem[fileId];

        if (offset >= file.offset + file.size) {
            fileId++;
            if (fileId >= filesystem.length) {
                break;
            }
            file = filesystem[fileId];
        }

        if (offset >= file.offset) {
            checksum += file.id * offset;
        }
        offset++;
    }
    return checksum.toString();
}
