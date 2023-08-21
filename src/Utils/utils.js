export async function validateImageUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        resolve(true);
      };
      img.onerror = function () {
        reject(false);
      };
      img.src = url;
    });
  }

  export function isImageLink(link) {
    const imageFormats = ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.svg', '.webp'];

    for (const imgFormat of imageFormats) {
      if (link.toLowerCase().endsWith(imgFormat)) {
        return true;
      }
    }

    return false;
  }

  export function extractTextWithHashtagsSplitedByComa(text_to_extract) {
    if (!text_to_extract) return "";
    const splittedTextBySpaces = text_to_extract.split(' ');
    const transformedSegments = [];
    splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) transformedSegments.push(textSegment.replace('#', ''));
    });
    const joinedText = transformedSegments.join(',');
    return joinedText;
  }

  export function createdLinkTitle(link) {
    if (link.includes("instagram.com")) {
      return "Instagram";
    } else if (link.includes("twitter.com")) {
      return "Twitter";
    } else if (link.includes("facebook.com")) {
      return "Facebook";
    } else if (link.includes("youtube.com")) {
      return "Youtube";
    } else if (link.includes("tiktok.com")) {
      return "Tiktok";
    } else if (link.includes("pinterest.com")) {
      return "Pinterest";
    } else if (link.includes("linkedin.com")) {
      return "Linkedin";
    } else if (link.includes("reddit.com")) {
      return "Reddit";
    } else if (link.includes("tumblr.com")) {
      return "Tumblr";
    }

    return extractDomain(link);
  }

  export function extractDomain(link) {
    if (typeof link !== "string" || link.trim() === "") {
      return "Title";
    }

    const domainParts = link
      .toLowerCase()
      .replace("https://www.", "")
      .replace("https://", "")
      .split(".");
    if (domainParts.length >= 1) {
      return capitalizeFirstLetter(domainParts[0]);
    } else {
      return "Title";
    }
  }

  export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  export function transformTextWithHashtags(t) {
    if (!t) return "";

    const splittedTextBySpaces = t.split(' ');
    const transformedSegments = splittedTextBySpaces.map((textSegment, index) => {
      if (textSegment.includes('#')) return <a className="hashtag" href={`/hashtag/${textSegment.replace('#', '')}`} key={index}>{textSegment + " "}</a>
      return textSegment + " ";
    });

    return transformedSegments;
  }