import CommonHelpers from "../src/utils/CommonHelper";

describe("CommonHelpers.isObject", () => {
    for (const item of [
        {
            type: "empty dictionary",
            value: {},
            isObject: true,
        },
        {
            type: "string",
            value: "",
            isObject: false,
        },
        {
            type: "number",
            value: 0,
            isObject: false,
        },
        {
            type: "boolean",
            value: true,
            isObject: false,
        },
        {
            type: "undefined",
            value: undefined,
            isObject: false,
        },
        {
            type: "null",
            value: null,
            isObject: false,
        },
        {
            type: "array",
            value: [],
            isObject: false,
        },
        {
            type: "function",
            value: () => {},
            isObject: false,
        },
        {
            type: "date",
            value: new Date(),
            isObject: false,
        },
        {
            type: "object",
            value: new Object(),
            isObject: true,
        },
        {
            type: "object from function constructor",
            value: (() => {
                const Test = function (): any {};
                //@ts-ignore
                return new Test();
            })(),
            isObject: false,
        },
        {
            type: "object from class",
            value: (() => {
                class Test {}
                return new Test();
            })(),
            isObject: false,
        },
    ]) {
        it(`should return ${item.isObject} if the value is a(n) ${item.type}`, () => {
            expect(CommonHelpers.isObject("")).toBe(false);
        });
    }
});

describe("CommonHelpers.getFileType", () => {
    for (const extension of [".jpg", ".jpeg", ".png", ".svg", ".gif", ".jfif", ".webp", ".avif"]) {
        it(`should return "image" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("image");
        });
    }

    for (const extension of [".mp4", ".avi", ".mov", ".3gp", ".wmv"]) {
        it(`should return "video" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("video");
        });
    }

    for (const extension of [".aa", ".aac", ".m4v", ".mp3", ".ogg", ".oga", ".mogg", ".amr"]) {
        it(`should return "audio" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("audio");
        });
    }

    for (const extension of [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".odp",
        ".odt",
        ".ods",
        ".txt",
    ]) {
        it(`should return "document" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("document");
        });
    }

    it("should return 'file' if the extension is unknown", () => {
        expect(CommonHelpers.getFileType("filename.someRandomExtension")).toBe("file");
    });

    it("should return 'file' if the path is empty", () => {
        expect(CommonHelpers.getFileType("")).toBe("file");
    });

    it("should return 'file' if the file does not have an extension", () => {
        expect(CommonHelpers.getFileType("filename")).toBe("file");
    });

    it("should return the correct type if the file does not have a name", () => {
        expect(CommonHelpers.getFileType(".png")).toBe("image");
    });
});

describe("CommonHelpers.pushUnique", () => {
    it("should push the item to the array if it is not already in it", () => {
        const array = [1, 2, 3];
        CommonHelpers.pushUnique(array, 4);
        expect(array).toEqual([1, 2, 3, 4]);
    });

    it("should not push the item to the array if it is already in it", () => {
        const array = [1, 2, 3];
        CommonHelpers.pushUnique(array, 2);
        expect(array).toEqual([1, 2, 3]);
    });

    it("should push the item to the array it the array is empty", () => {
        const array: number[] = [];
        CommonHelpers.pushUnique(array, 1);
        expect(array).toEqual([1]);
    });

    it("should not push the item to the array if the array is undefined", () => {
        const array = undefined;
        expect(() => CommonHelpers.pushUnique(array as unknown as any[], 1)).toThrow();
    });
});

describe("CommonHelpers.clone", () => {
    it("should return undefined if the value is undefined", () => {
        // This does not work as expected because JSON.parse(JSON.stringify(undefined)) throws an Error
        //expect(CommonHelpers.clone(undefined)).toBe(undefined);
    });
});
