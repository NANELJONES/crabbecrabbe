"use client"
import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon,
  } from "react-share";

const ShareSocials = (shareUrl, shareTitle,shareDescription) => {

  return (
    <div>
{/* 
<h5>Share on all social media</h5> */}
        <div className="flex gap-4 mt-4">
          {/* Facebook Share Button */}
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>

          {/* Twitter Share Button */}
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>

          {/* LinkedIn Share Button */}
          <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareDescription}>
            <LinkedinIcon size={30} round={true} />
          </LinkedinShareButton>

          {/* WhatsApp Share Button */}
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>

          {/* Email Share Button */}
          <EmailShareButton url={shareUrl} subject={shareTitle} body={shareDescription}>
            <EmailIcon size={30} round={true} />
          </EmailShareButton>
        </div>
    </div>
  )
}

export default ShareSocials