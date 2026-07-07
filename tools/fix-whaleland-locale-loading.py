#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Repair Whale Land locale loading after a Windows PowerShell encoding issue.

This script is intentionally ASCII-safe. It rewrites locale JSON files as valid
UTF-8 JSON and fixes two mojibake strings in app.js.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LOCALE_DATA = json.loads(r""" {
  "ko": {
    "meta": {
      "title": "Whale Land \u2014 \uc990\uac70\uc6b4 \uc544\uc774\ub514\uc5b4\ub97c \uc11c\ube44\uc2a4\ub85c \ub9cc\ub4dc\ub294 \ud68c\uc0ac",
      "description": "Whale Land\ub294 \uc7ac\ubc0c\uace0 \uc990\uac70\uc6b4 \uc544\uc774\ub514\uc5b4\ub85c \uc138\uc0c1\uc744 \ub354 \ub2e4\uc591\ud558\uace0 \ud589\ubcf5\ud558\uac8c \ubc14\uafb8\ub294 \uc11c\ube44\uc2a4\ub97c \ub9cc\ub4ed\ub2c8\ub2e4."
    },
    "common": {
      "navCompany": "\ud68c\uc0ac \uc18c\uac1c",
      "navServiceIntro": "\uc11c\ube44\uc2a4 \uc18c\uac1c",
      "navServiceList": "\uc11c\ube44\uc2a4 \ubaa9\ub85d",
      "navContact": "\ubb38\uc758",
      "backHome": "Whale Land\ub85c \ub3cc\uc544\uac00\uae30",
      "officialSite": "\uacf5\uc2dd \uc0ac\uc774\ud2b8",
      "learnMore": "\uc790\uc138\ud788 \ubcf4\uae30",
      "externalNotice": "\ub3c5\ub9bd \uc11c\ube44\uc2a4 \uc0ac\uc774\ud2b8\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
      "contactPhone": "070-8028-3008",
      "contactEmail": "contact@whalelandkr.com",
      "footerLine": "Fun ideas, useful services, happier moments.",
      "copyright": "\u00a9 2026 Whale Land. All rights reserved."
    },
    "home": {
      "logoKicker": "WHALE LAND / IDEA COMPANY",
      "logoNote": "SEOUL \u00b7 IDEAS IN MOTION",
      "introEyebrow": "ABOUT WHALE LAND",
      "introTitle": "\uc7ac\ubc0c\uace0 \uc990\uac70\uc6b4 \uc544\uc774\ub514\uc5b4\ub85c, \uc138\uc0c1\uc744 \uc870\uae08 \ub354 \ub2e4\uc591\ud558\uace0 \ud589\ubcf5\ud558\uac8c.",
      "introBody": "\uc6e8\uc77c\ub79c\ub4dc\ub294 \uc0ac\ub78c\ub4e4\uc758 \uc77c\uc0c1\uacfc \uc5ec\ud589 \uc18d\uc5d0 \uc791\uc740 \uc7ac\ubbf8\ub97c \ub354\ud558\ub294 \ud68c\uc0ac\ub97c \uc9c0\ud5a5\ud569\ub2c8\ub2e4.\n\uae30\uc220, \uc774\uc57c\uae30, \uce90\ub9ad\ud130, \uc624\ud504\ub77c\uc778 \uacbd\ud5d8\uc744 \uc790\uc720\ub86d\uac8c \uc5ee\uc5b4 \uc0c8\ub85c\uc6b4 \uc11c\ube44\uc2a4\ub97c \uc2e4\ud5d8\ud558\uace0 \ub9cc\ub4ed\ub2c8\ub2e4.\n\uc9c0\uae08\uc758 \uc11c\ube44\uc2a4\ub294 \ub05d\uc774 \uc544\ub2c8\ub77c, \uacc4\uc18d \ubc14\ub00c\uace0 \ud655\uc7a5\ub418\ub294 \uc6e8\uc77c\ub79c\ub4dc\uc758 \ud604\uc7ac \ubaa8\uc2b5\uc785\ub2c8\ub2e4.",
      "serviceSectionEyebrow": "SERVICE INTRODUCTION",
      "serviceLinkCta": "\uc11c\ube44\uc2a4 \ud398\uc774\uc9c0 \ubcf4\uae30",
      "serviceListEyebrow": "SERVICE HUB",
      "serviceListTitle": "\uc9c0\uae08 \ub9cc\ub0a0 \uc218 \uc788\ub294 \uc6e8\uc77c\ub79c\ub4dc\uc758 \uc11c\ube44\uc2a4",
      "serviceListBody": "\uac01 \uc11c\ube44\uc2a4\ub294 \ub3c5\ub9bd\uc801\uc778 \uc138\uacc4\uad00\uacfc \uae30\ub2a5\uc744 \uac00\uc9c4 \ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4. \uc0c8 \uc11c\ube44\uc2a4\uac00 \uc0dd\uae30\uba74 \uc774 \ud5c8\ube0c\uc5d0 \uc790\uc5f0\uc2a4\ub7fd\uac8c \ucd94\uac00\ub429\ub2c8\ub2e4.",
      "contactEyebrow": "CONTACT WHALE LAND",
      "contactTitle": "\uc0c8\ub85c\uc6b4 \uc81c\uc548, \ud611\uc5c5, \ubb38\uc758\ub97c \uae30\ub2e4\ub9bd\ub2c8\ub2e4.",
      "contactBody": "\uc11c\ube44\uc2a4 \uc774\uc6a9, \uc81c\ud734, \uc81c\uc791 \ubb38\uc758\uac00 \uc788\ub2e4\uba74 \uc544\ub798 \uc5f0\ub77d\ucc98\ub85c \ubcf4\ub0b4\uc8fc\uc138\uc694. \uc774\uba54\uc77c \uc8fc\uc18c\ub294 \ubc84\ud2bc\uc73c\ub85c \ubc14\ub85c \ubcf5\uc0ac\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
      "contactPhoneLabel": "\uc804\ud654",
      "contactEmailLabel": "\uc774\uba54\uc77c",
      "contactCopyEmail": "\ubb38\uc758 \uc774\uba54\uc77c \ubcf5\uc0ac",
      "contactCopiedEmail": "\uc774\uba54\uc77c\uc744 \ubcf5\uc0ac\ud588\uc2b5\ub2c8\ub2e4",
      "featuredServiceSlugs": [
        "korean-birth-type",
        "haedurio",
        "covert"
      ],
      "principles": []
    },
    "services": {
      "korean-birth-type": {
        "slug": "korean-birth-type",
        "order": "01",
        "theme": "birth",
        "accent": "#8b6bff",
        "illustration": "birth-type.svg",
        "status": "LIVE",
        "category": "SELF-DISCOVERY",
        "title": "Korean Birth Type",
        "cardTitle": "\ud55c\uad6d\uc2dd \uc0ac\uc8fc \ud574\uc11d\uc73c\ub85c \ub2f9\uc2e0\uc744 \uc2dc\ud5d8\ud574\ubcf4\uc138\uc694.",
        "summary": "\ub2f9\uc2e0\uc740 \ub2f9\uc2e0\uc5d0 \ub300\ud574\uc11c \uc798 \uc54c\uace0 \uc788\ub098\uc694? \ud55c\uad6d\uc2dd \uc0ac\uc8fc \ud574\uc11d\uc73c\ub85c \ub2f9\uc2e0\uc744 \uc2dc\ud5d8\ud574\ubcf4\uc138\uc694. \uc5b4\uca4c\uba74 \ub2f9\uc2e0\uc758 \uc9c4\uc9dc \uc0ac\ub791\uacfc \uc6b4\uc744 \uc54c \uc218 \uc788\uc744\uc9c0 \ubab0\ub77c\uc694.",
        "homeEyebrow": "KOREAN BIRTH TYPE",
        "homeTitle": "\ub2f9\uc2e0\uc740 \ub2f9\uc2e0\uc5d0 \ub300\ud574\uc11c \uc798 \uc54c\uace0 \uc788\ub098\uc694?",
        "homeDescription": "\ud55c\uad6d\uc2dd \uc0ac\uc8fc \ud574\uc11d\uc73c\ub85c \ub2f9\uc2e0\uc744 \uc2dc\ud5d8\ud574\ubcf4\uc138\uc694. \uc5b4\uca4c\uba74 \ub2f9\uc2e0\uc758 \uc9c4\uc9dc \uc0ac\ub791\uacfc \uc6b4\uc744 \uc54c \uc218 \uc788\uc744\uc9c0 \ubab0\ub77c\uc694.",
        "heroTitle": "\ud55c\uad6d\uc2dd \uc0ac\uc8fc \ud574\uc11d\uc73c\ub85c \ub2f9\uc2e0\uc744 \uc2dc\ud5d8\ud574\ubcf4\uc138\uc694.",
        "heroLead": "Korean Birth Type\uc740 \uc0ac\uc8fc\ub97c \ubb34\uac81\uace0 \ub2e8\uc815\uc801\uc778 \uc608\uc5b8\uc774 \uc544\ub2c8\ub77c, \ub098\ub97c \uc54c\uc544\ubcf4\ub294 \uc990\uac70\uc6b4 \ud14c\uc2a4\ud2b8\ucc98\ub7fc \ud480\uc5b4\ub0b8 \uc790\uae30\uc774\ud574 \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.",
        "visualCaption": "A playful self-reading system inspired by Korean saju.",
        "externalUrl": "https://koreanbirthtype.com",
        "externalCta": "Korean Birth Type \uc2dc\uc791\ud558\uae30",
        "tags": [
          "SELF-DISCOVERY",
          "SAJU",
          "DIGITAL CARDS"
        ],
        "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
        "statementTitle": "\uc608\uc5b8\ubcf4\ub2e4 \uac00\ubccd\uace0, \uc2ec\ub9ac \ud14c\uc2a4\ud2b8\ubcf4\ub2e4 \uae4a\uac8c.",
        "statementBody": "\ud0dc\uc5b4\ub09c \ub0a0\uc9dc\uc640 \uc2dc\uac04\uc5d0\uc11c \ucd9c\ubc1c\ud558\uc9c0\ub9cc \ubaa9\uc801\uc740 \ubbf8\ub798\ub97c \ub2e8\uc815\ud558\ub294 \uac83\uc774 \uc544\ub2d9\ub2c8\ub2e4. \uc77c\uc8fc, \uc624\ud589, \uad00\uacc4\uc640 \uc6b4\uc758 \ud750\ub984\uc744 \uce74\ub4dc\ucc98\ub7fc \ud3bc\uccd0 \uc2a4\uc2a4\ub85c\ub97c \uc0c8\ub86d\uac8c \ubc14\ub77c\ubcf4\ub294 \uc2e4\ub9c8\ub9ac\ub97c \uc81c\uacf5\ud569\ub2c8\ub2e4.",
        "featuresTitle": "\uce74\ub4dc\ub85c \uc77d\ub294 \ub098\uc758 \uad6c\uc870",
        "features": [
          {
            "index": "01",
            "title": "\ud55c\uad6d\uc2dd \ub9ac\ub529",
            "body": "\uc0ac\uc8fc\uc758 \uad6c\uc870\ub97c \ud604\ub300\uc801\uc778 \uc5b8\uc5b4\uc640 \uce74\ub4dc \uacbd\ud5d8\uc73c\ub85c \ubc14\uafc9\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\uc0ac\ub791\uacfc \uc6b4\uc758 \ud78c\ud2b8",
            "body": "\uad00\uacc4, \uc131\ud5a5, \ud750\ub984\uc744 \uac00\ubccd\uc9c0\ub9cc \uae30\uc5b5\uc5d0 \ub0a8\ub294 \ubc29\uc2dd\uc73c\ub85c \ubcf4\uc5ec\uc90d\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "\ubaa8\ubc14\uc77c \uc800\uc7a5",
            "body": "\uacb0\uacfc\ub97c \uce74\ub4dc\ucc98\ub7fc \uc77d\uace0 \ub9c8\uc74c\uc5d0 \ub0a8\ub294 \ubd80\ubd84\uc744 \uc800\uc7a5\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
          }
        ],
        "processEyebrow": "HOW IT FLOWS",
        "processTitle": "\uc785\ub825\ud558\uace0, \uc77d\uace0, \uc800\uc7a5\ud569\ub2c8\ub2e4.",
        "steps": [
          {
            "index": "01",
            "title": "\uc0dd\ub144\uc6d4\uc77c \uc785\ub825",
            "body": "\ub9ac\ub529\uc5d0 \ud544\uc694\ud55c \uae30\ubcf8 \uc815\ubcf4\ub97c \uc785\ub825\ud569\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\uce74\ub4dc \ub9ac\ub529",
            "body": "\uc0ac\uc8fc \uae30\ubc18 \ud574\uc11d\uc774 \uce74\ub4dc \ud750\ub984\uc73c\ub85c \ud3bc\uccd0\uc9d1\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "\uacb0\uacfc \ud655\uc778",
            "body": "\uae30\uc5b5\uc5d0 \ub0a8\ub294 \uce74\ub4dc\ub97c \uc800\uc7a5\ud558\uace0 \ub2e4\uc2dc \ud655\uc778\ud569\ub2c8\ub2e4."
          }
        ],
        "closingTitle": "\ub2f9\uc2e0\uc758 Korean Birth Type\uc744 \ud655\uc778\ud558\uc138\uc694.",
        "closingBody": "\uc774\ubbf8 \uc790\uc2e0\uc744 \uc798 \uc548\ub2e4\uace0 \uc0dd\uac01\ud574\ub3c4, \uc758\uc678\uc758 \ub2e8\uc11c\ub97c \ubc1c\uacac\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
      },
      "haedurio": {
        "slug": "haedurio",
        "order": "02",
        "theme": "haedurio",
        "accent": "#25b7c7",
        "illustration": "haedurio.svg",
        "status": "LIVE",
        "category": "TRAVEL SUPPORT",
        "title": "\ud574\ub4dc\ub9ac\uc624",
        "cardTitle": "\ud55c\uad6d\uc5d0\uc11c \uace4\ub780\ud55c \uc77c\uc774 \uc788\ub098\uc694?",
        "summary": "\ud55c\uad6d\uc5d0\uc11c \uace4\ub780\ud55c \uc77c\uc774 \uc788\ub098\uc694? \ubb34\uc5c7\uc774\ub4e0 \ud574\uacb0\ud558\ub294 \ud574\uacb0\uc0ac, \ud574\ub4dc\ub9ac\uc624 \uc11c\ube44\uc2a4\ub97c \uc774\uc6a9\ud574\ubcf4\uc138\uc694.",
        "homeEyebrow": "HAEDURIO",
        "homeTitle": "\ud55c\uad6d\uc5d0\uc11c \uace4\ub780\ud55c \uc77c\uc774 \uc788\ub098\uc694?",
        "homeDescription": "\ubb34\uc5c7\uc774\ub4e0 \ud574\uacb0\ud558\ub294 \ud574\uacb0\uc0ac, \ud574\ub4dc\ub9ac\uc624 \uc11c\ube44\uc2a4\ub97c \uc774\uc6a9\ud574\ubcf4\uc138\uc694.",
        "heroTitle": "\ud55c\uad6d \uc5ec\ud589 \uc911 \ub9c9\ud78c \uc21c\uac04, \ud604\uc9c0\uc5d0\uc11c \ud574\uacb0\ud569\ub2c8\ub2e4.",
        "heroLead": "\ud574\ub4dc\ub9ac\uc624\ub294 \ud55c\uad6d \uc5ec\ud589 \uc911 \uc608\uc57d, \uad6c\ub9e4, \ubc30\uc1a1, \ubd84\uc2e4 \ub4f1 \uc608\uc0c1\ud558\uc9c0 \ubabb\ud55c \ubb38\uc81c\ub97c \uc815\ub9ac\ud558\uace0 \ud574\uacb0 \uacbd\ub85c\ub97c \ucc3e\ub3c4\ub85d \ub3d5\ub294 \ud604\uc9c0 \uc9c0\uc6d0 \uc11c\ube44\uc2a4\uc785\ub2c8\ub2e4.",
        "visualCaption": "Local help for the moments that interrupt your trip.",
        "externalUrl": "https://haedurio.com",
        "externalCta": "\ud574\ub4dc\ub9ac\uc624 \ubc29\ubb38\ud558\uae30",
        "tags": [
          "LOCAL SUPPORT",
          "TRAVEL HELP",
          "KOREA"
        ],
        "statementEyebrow": "KEEP THE TRIP MOVING",
        "statementTitle": "\uace4\ub780\ud55c \uc2dc\uac04\uc740 \uc9e7\uac8c, \uc5ec\ud589\uc740 \uacc4\uc18d\ub418\uac8c.",
        "statementBody": "\ub0af\uc120 \uc5b8\uc5b4\uc640 \ud658\uacbd\uc5d0\uc11c\ub294 \uc791\uc740 \ubb38\uc81c\ub3c4 \uc5ec\ud589 \uc804\uccb4\ub97c \uba48\ucd94\uac8c \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \ud574\ub4dc\ub9ac\uc624\ub294 \uc0c1\ud669\uc744 \uc815\ub9ac\ud558\uace0 \ud604\uc9c0 \ub9e5\ub77d\uc744 \ud655\uc778\ud574 \ub2e4\uc74c \ud589\ub3d9\uc744 \uacb0\uc815\ud560 \uc218 \uc788\uac8c \ub3d5\uc2b5\ub2c8\ub2e4.",
        "featuresTitle": "\ubb38\uc81c \uc124\uba85\ubd80\ud130 \ud574\uacb0 \uacbd\ub85c\uae4c\uc9c0",
        "features": [
          {
            "index": "01",
            "title": "\uc0c1\ud669 \uc815\ub9ac",
            "body": "\ubcf5\uc7a1\ud55c \uc0c1\ud669\ub3c4 \ud544\uc694\ud55c \uc815\ubcf4\ubd80\ud130 \ucc28\uadfc\ucc28\uadfc \uc815\ub9ac\ud560 \uc218 \uc788\uac8c \uc548\ub0b4\ud569\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\ud604\uc9c0 \uae30\uc900 \ud655\uc778",
            "body": "\ud55c\uad6d\uc758 \uc608\uc57d, \uad6c\ub9e4, \ubc30\uc1a1 \ud658\uacbd\uc744 \uae30\uc900\uc73c\ub85c \uac00\ub2a5\ud55c \uc120\ud0dd\uc9c0\ub97c \ud655\uc778\ud569\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "\ub2e4\uc74c \ud589\ub3d9 \uc5f0\uacb0",
            "body": "\ub2e8\uc21c \ubc88\uc5ed\uc744 \ub118\uc5b4 \uc2e4\uc81c\ub85c \ubb34\uc5c7\uc744 \ud574\uc57c \ud558\ub294\uc9c0 \uc54c\ub824\uc90d\ub2c8\ub2e4."
          }
        ],
        "processEyebrow": "HOW IT WORKS",
        "processTitle": "\ubb38\uc81c\uac00 \uc0dd\uae34 \uc21c\uac04\ubd80\ud130 \ub2e4\uc2dc \uc5ec\ud589\uc73c\ub85c \ub3cc\uc544\uac08 \ub54c\uae4c\uc9c0.",
        "steps": [
          {
            "index": "01",
            "title": "\uc0c1\ud669 \uc804\ub2ec",
            "body": "\ubb34\uc2a8 \uc77c\uc774 \uc0dd\uacbc\ub294\uc9c0 \ud544\uc694\ud55c \ub0b4\uc6a9\uc744 \uc804\ub2ec\ud569\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\ud574\uacb0 \uacbd\ub85c \ud655\uc778",
            "body": "\uac00\ub2a5\ud55c \ubc29\ubc95\uacfc \ud544\uc694\ud55c \uc808\ucc28\ub97c \ud604\uc9c0 \uae30\uc900\uc73c\ub85c \ud655\uc778\ud569\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "\uc9c4\ud589 \uc548\ub0b4",
            "body": "\uc120\ud0dd\ud55c \ubc29\ud5a5\uc5d0 \ub530\ub77c \ub2e4\uc74c \ub2e8\uacc4\ub85c \uc774\uc5b4\uc9d1\ub2c8\ub2e4."
          }
        ],
        "closingTitle": "\uc5ec\ud589\uc758 \ubb38\uc81c\ub294 \uc9e7\uac8c, \uae30\uc5b5\uc740 \uae38\uac8c.",
        "closingBody": "\ud55c\uad6d\uc5d0\uc11c \ub3c4\uc6c0\uc774 \ud544\uc694\ud55c \uc21c\uac04, \ud574\ub4dc\ub9ac\uc624\uc5d0\uc11c \uc0c1\ud669\uc744 \uc54c\ub824\uc8fc\uc138\uc694."
      },
      "covert": {
        "slug": "covert",
        "order": "03",
        "theme": "covert",
        "accent": "#52616d",
        "illustration": "covert.svg",
        "status": "PREPARING",
        "category": "MISSION TRAVEL",
        "title": "\ubc94\uc774 \uc2a4\ud0ec\ud504 \ud22c\uc5b4",
        "cardTitle": "\ud3c9\ubc94\ud55c \uc5ec\ud589\uc740 \uadf8\ub9cc!",
        "summary": "\ud3c9\ubc94\ud55c \uc5ec\ud589\uc740 \uadf8\ub9cc! \uc774\uc81c\ub294 \uc7a0\uc785\uce68\ud22c\uc561\uc158\uad00\uad11\uc758 \uc2dc\ub300\uc785\ub2c8\ub2e4. \ubc94\uc774\uc640 \ud568\uaed8 Mission CLEAR!",
        "homeEyebrow": "BEOMI STAMP TOUR",
        "homeTitle": "\ud3c9\ubc94\ud55c \uc5ec\ud589\uc740 \uadf8\ub9cc!",
        "homeDescription": "\uc774\uc81c\ub294 \uc7a0\uc785\uce68\ud22c\uc561\uc158\uad00\uad11\uc758 \uc2dc\ub300\uc785\ub2c8\ub2e4. \ubc94\uc774\uc640 \ud568\uaed8 Mission CLEAR!",
        "heroTitle": "\uc11c\uc6b8 \uc5ec\ud589\uc744 \ube44\ubc00 \ubbf8\uc158\uc73c\ub85c \ubc14\uafb8\ub294 \uc2a4\ud0ec\ud504 \ud22c\uc5b4.",
        "heroLead": "\ubc94\uc774 \uc2a4\ud0ec\ud504 \ud22c\uc5b4\ub294 \uc11c\uc6b8\uc758 \uc7a5\uc18c\ub97c \uc791\uc804 \uad6c\uc5ed\ucc98\ub7fc \ud0d0\ud5d8\ud558\uace0, \uc5ec\uad8c\ud615 \ubbf8\uc158 \uc218\ucca9\uc5d0 \uc2a4\ud0ec\ud504\uc640 \uae30\ub85d\uc744 \ub0a8\uae30\ub294 \uccb4\ud5d8\ud615 \uad00\uad11 \ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4.",
        "visualCaption": "A field mission hidden inside an ordinary city trip.",
        "externalUrl": "/covert/?lang=kr",
        "externalCta": "\ubc94\uc774 \uc2a4\ud0ec\ud504 \ud22c\uc5b4 \uc785\uc7a5",
        "tags": [
          "STAMP TOUR",
          "SEOUL",
          "MISSION CLEAR"
        ],
        "statementEyebrow": "YOUR CITY. YOUR MISSION.",
        "statementTitle": "\uad00\uad11\uc9c0\ub97c \uccb4\ud06c\ud558\ub294 \uc5ec\ud589\uc5d0\uc11c, \uc784\ubb34\ub97c \uc644\uc218\ud558\ub294 \uc5ec\ud589\uc73c\ub85c.",
        "statementBody": "\uc720\uba85\ud55c \uc7a5\uc18c\ub97c \ubcf4\ub294 \uac83\ub9cc\uc73c\ub85c \ub05d\ub098\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ubbf8\uc158 \uc218\ucca9\uc744 \ud3bc\uce58\uace0 \uc791\uc804 \uad6c\uc5ed\uc744 \ucc3e\uc544\uac00 \uc2a4\ud0ec\ud504\uc640 \ud604\uc7a5 \uc815\ubcf4\ub97c \uc218\uc9d1\ud558\uba74, \uc11c\uc6b8 \uc5ec\ud589 \uc804\uccb4\uac00 \ud558\ub098\uc758 \ube44\ubc00 \uc784\ubb34\uac00 \ub429\ub2c8\ub2e4.",
        "featuresTitle": "\uc190\uc5d0 \ub4e4\uace0 \uac77\ub294 \ube44\ubc00 \uc791\uc804",
        "features": [
          {
            "index": "01",
            "title": "\uc5ec\uad8c\ud615 \ubbf8\uc158 \uc218\ucca9",
            "body": "\uc791\uc804 \ube0c\ub9ac\ud551, \uc7a5\uc18c \uc815\ubcf4, \uae30\ub85d \uacf5\uac04\uc744 \ub2f4\uc740 \uc2e4\ubb3c \uc218\ucca9\uc785\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\uc11c\uc6b8 \uc791\uc804 \uad6c\uc5ed",
            "body": "\uc804\ud1b5, \uc1fc\ud551, \uc74c\uc2dd, \uc57c\uacbd\uacfc \ub3d9\ub124 \ubb38\ud654\ub97c \uc11c\ub85c \ub2e4\ub978 \ubbf8\uc158\ucc98\ub7fc \ud0d0\ud5d8\ud569\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "Mission CLEAR",
            "body": "\uc2a4\ud0ec\ud504\uc640 \uae30\ub85d\uc744 \ubaa8\uc544 \ub098\ub9cc\uc758 \uc11c\uc6b8 \uc791\uc804 \uacb0\uacfc\ub97c \uc644\uc131\ud569\ub2c8\ub2e4."
          }
        ],
        "processEyebrow": "MISSION FLOW",
        "processTitle": "\ube0c\ub9ac\ud551\uc744 \ubc1b\uace0, \ud604\uc7a5\uc73c\ub85c \uc774\ub3d9\ud558\uace0, \uae30\ub85d\uc744 \ub0a8\uae41\ub2c8\ub2e4.",
        "steps": [
          {
            "index": "01",
            "title": "\ube0c\ub9ac\ud551 \uc218\ub839",
            "body": "\ubbf8\uc158 \uc218\ucca9\uc5d0\uc11c \uc11c\uc6b8 \uc791\uc804 \uad6c\uc5ed\uacfc \uc9c0\ub839\uc744 \ud655\uc778\ud569\ub2c8\ub2e4."
          },
          {
            "index": "02",
            "title": "\ud604\uc7a5 \uc791\uc804",
            "body": "\ub3c4\uc2dc\ub97c \uc774\ub3d9\ud558\uba70 \uc2a4\ud0ec\ud504\uc640 \uc790\uc2e0\ub9cc\uc758 \uae30\ub85d\uc744 \uc218\uc9d1\ud569\ub2c8\ub2e4."
          },
          {
            "index": "03",
            "title": "\uc784\ubb34 \uc644\ub8cc",
            "body": "\ubc94\uc774\uc640 \ud568\uaed8 Mission CLEAR\ub97c \uc644\uc131\ud569\ub2c8\ub2e4."
          }
        ],
        "closingTitle": "\uc11c\uc6b8\uc740 \uc774\ubbf8 \uc791\uc804 \uad6c\uc5ed\uc785\ub2c8\ub2e4.",
        "closingBody": "\uc694\uc6d0 \ub4f1\ub85d\uacfc \ucd5c\uc885 \ubcf4\uace0\ub97c \uc704\ud55c \ub3c5\ub9bd \uc0ac\uc774\ud2b8\ub294 \uacc4\uc18d \uc900\ube44 \uc911\uc785\ub2c8\ub2e4."
      }
    }
  },
  "en": {
    "meta": {
      "title": "Whale Land \u2014 An idea company for playful services",
      "description": "Whale Land creates playful services that make the world more varied, useful, and happy."
    },
    "common": {
      "navCompany": "Company",
      "navServiceIntro": "Services",
      "navServiceList": "Service list",
      "navContact": "Contact",
      "backHome": "Back to Whale Land",
      "officialSite": "Official site",
      "learnMore": "Learn more",
      "externalNotice": "You are entering an independent service site.",
      "contactPhone": "070-8028-3008",
      "contactEmail": "contact@whalelandkr.com",
      "footerLine": "Fun ideas, useful services, happier moments.",
      "copyright": "\u00a9 2026 Whale Land. All rights reserved."
    },
    "home": {
      "logoKicker": "WHALE LAND / IDEA COMPANY",
      "logoNote": "SEOUL \u00b7 IDEAS IN MOTION",
      "introEyebrow": "ABOUT WHALE LAND",
      "introTitle": "Playful ideas for a more varied and happy world.",
      "introBody": "Whale Land builds services that add small sparks of fun to everyday life and travel.\nWe freely mix technology, stories, characters, and physical experiences.\nThe services you see now are not a fixed lineup, but the current shape of an evolving company.",
      "serviceSectionEyebrow": "SERVICE INTRODUCTION",
      "serviceLinkCta": "View service page",
      "serviceListEyebrow": "SERVICE HUB",
      "serviceListTitle": "Whale Land services you can meet now",
      "serviceListBody": "Each service is an independent project with its own world and purpose. New services can be added to this hub as Whale Land evolves.",
      "contactEyebrow": "CONTACT WHALE LAND",
      "contactTitle": "We welcome proposals, partnerships, and questions.",
      "contactBody": "For service use, partnerships, production, or business inquiries, contact us below. You can copy the email address with one button.",
      "contactPhoneLabel": "Phone",
      "contactEmailLabel": "Email",
      "contactCopyEmail": "Copy inquiry email",
      "contactCopiedEmail": "Email copied",
      "featuredServiceSlugs": [
        "korean-birth-type",
        "haedurio",
        "covert"
      ],
      "principles": []
    },
    "services": {
      "korean-birth-type": {
        "slug": "korean-birth-type",
        "order": "01",
        "theme": "birth",
        "accent": "#8b6bff",
        "illustration": "birth-type.svg",
        "status": "LIVE",
        "category": "SELF-DISCOVERY",
        "title": "Korean Birth Type",
        "cardTitle": "Test yourself through Korean-style saju reading.",
        "summary": "Do you really know yourself? Test yourself through Korean-style saju reading. You may discover hints about your real love and luck.",
        "homeEyebrow": "KOREAN BIRTH TYPE",
        "homeTitle": "Do you really know yourself?",
        "homeDescription": "Test yourself through Korean-style saju reading. You may discover hints about your real love and luck.",
        "heroTitle": "Test yourself through Korean-style saju reading.",
        "heroLead": "Korean Birth Type turns saju into a playful self-understanding experience, not a heavy prediction.",
        "visualCaption": "A playful self-reading system inspired by Korean saju.",
        "externalUrl": "https://koreanbirthtype.com",
        "externalCta": "Start Korean Birth Type",
        "tags": [
          "SELF-DISCOVERY",
          "SAJU",
          "DIGITAL CARDS"
        ],
        "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
        "statementTitle": "Lighter than a prophecy, deeper than a quiz.",
        "statementBody": "It starts from your birth date and time, but it does not define your future. It turns day pillars, five elements, relationships, and luck into cards that help you look at yourself in a new way.",
        "featuresTitle": "A card-based way to read yourself",
        "features": [
          {
            "index": "01",
            "title": "Korean-style reading",
            "body": "Saju structures are translated into modern language and card experiences."
          },
          {
            "index": "02",
            "title": "Hints on love and luck",
            "body": "Relationships, tendencies, and rhythms are shown in a light but memorable way."
          },
          {
            "index": "03",
            "title": "Mobile saving",
            "body": "Read the result like cards, save what stays with you, and revisit it later."
          }
        ],
        "processEyebrow": "HOW IT FLOWS",
        "processTitle": "Enter, read, and save.",
        "steps": [
          {
            "index": "01",
            "title": "Enter birth data",
            "body": "Add the basic information needed for the reading."
          },
          {
            "index": "02",
            "title": "Card reading",
            "body": "The saju-based interpretation unfolds as cards."
          },
          {
            "index": "03",
            "title": "Check results",
            "body": "Save memorable parts and return to them later."
          }
        ],
        "closingTitle": "Find your Korean Birth Type.",
        "closingBody": "Even if you think you know yourself well, it may give you a new clue."
      },
      "haedurio": {
        "slug": "haedurio",
        "order": "02",
        "theme": "haedurio",
        "accent": "#25b7c7",
        "illustration": "haedurio.svg",
        "status": "LIVE",
        "category": "TRAVEL SUPPORT",
        "title": "Haedurio",
        "cardTitle": "Having trouble in Korea?",
        "summary": "Having trouble in Korea? Try Haedurio, the fixer service that helps with almost anything.",
        "homeEyebrow": "HAEDURIO",
        "homeTitle": "Having trouble in Korea?",
        "homeDescription": "Try Haedurio, the fixer service that helps with almost anything.",
        "heroTitle": "Local help when your Korea trip gets stuck.",
        "heroLead": "Haedurio helps travelers organize unexpected problems in Korea, from reservations and purchases to delivery and lost items, then find a practical next step.",
        "visualCaption": "Local help for the moments that interrupt your trip.",
        "externalUrl": "https://haedurio.com",
        "externalCta": "Visit Haedurio",
        "tags": [
          "LOCAL SUPPORT",
          "TRAVEL HELP",
          "KOREA"
        ],
        "statementEyebrow": "KEEP THE TRIP MOVING",
        "statementTitle": "Shorten the trouble, keep the trip going.",
        "statementBody": "In an unfamiliar language and place, even a small problem can stop the whole trip. Haedurio helps clarify the situation, check the local context, and choose the next action.",
        "featuresTitle": "From problem explanation to next steps",
        "features": [
          {
            "index": "01",
            "title": "Clarify the situation",
            "body": "Guides you to organize even complicated issues from the necessary details."
          },
          {
            "index": "02",
            "title": "Check local context",
            "body": "Reviews possible choices based on Korea's reservation, purchase, and delivery environment."
          },
          {
            "index": "03",
            "title": "Connect the next action",
            "body": "Goes beyond translation and helps you understand what to do next."
          }
        ],
        "processEyebrow": "HOW IT WORKS",
        "processTitle": "From the moment trouble appears until you return to your trip.",
        "steps": [
          {
            "index": "01",
            "title": "Share the situation",
            "body": "Send the key details about what happened."
          },
          {
            "index": "02",
            "title": "Check possible routes",
            "body": "Review available methods and required steps in the local context."
          },
          {
            "index": "03",
            "title": "Move forward",
            "body": "Follow the selected direction to the next step."
          }
        ],
        "closingTitle": "Make trip problems short and memories long.",
        "closingBody": "When you need help in Korea, tell Haedurio what happened."
      },
      "covert": {
        "slug": "covert",
        "order": "03",
        "theme": "covert",
        "accent": "#52616d",
        "illustration": "covert.svg",
        "status": "PREPARING",
        "category": "MISSION TRAVEL",
        "title": "Beomi Stamp Tour",
        "cardTitle": "No more ordinary trips!",
        "summary": "No more ordinary trips! It is the age of covert infiltration action tourism. Mission CLEAR with Beomi!",
        "homeEyebrow": "BEOMI STAMP TOUR",
        "homeTitle": "No more ordinary trips!",
        "homeDescription": "It is the age of covert infiltration action tourism. Mission CLEAR with Beomi!",
        "heroTitle": "A stamp tour that turns Seoul into a secret mission.",
        "heroLead": "Beomi Stamp Tour is an experience-based travel project where you explore Seoul like a field operation and record stamps in a passport-style mission book.",
        "visualCaption": "A field mission hidden inside an ordinary city trip.",
        "externalUrl": "/covert/?lang=kr",
        "externalCta": "Enter Beomi Stamp Tour",
        "tags": [
          "STAMP TOUR",
          "SEOUL",
          "MISSION CLEAR"
        ],
        "statementEyebrow": "YOUR CITY. YOUR MISSION.",
        "statementTitle": "From checking tourist spots to clearing missions.",
        "statementBody": "The trip does not end with seeing famous places. Open the mission book, visit operation zones, collect stamps and field notes, and the whole Seoul trip becomes a secret mission.",
        "featuresTitle": "A secret operation in your hand",
        "features": [
          {
            "index": "01",
            "title": "Passport-style mission book",
            "body": "A physical booklet with briefings, place information, and record pages."
          },
          {
            "index": "02",
            "title": "Seoul operation zones",
            "body": "Explore tradition, shopping, food, night views, and neighborhoods as different missions."
          },
          {
            "index": "03",
            "title": "Mission CLEAR",
            "body": "Collect stamps and records to complete your own Seoul operation."
          }
        ],
        "processEyebrow": "MISSION FLOW",
        "processTitle": "Receive the briefing, move to the field, and leave records.",
        "steps": [
          {
            "index": "01",
            "title": "Receive briefing",
            "body": "Check operation zones and directives in the mission book."
          },
          {
            "index": "02",
            "title": "Field operation",
            "body": "Move through the city, collecting stamps and your own notes."
          },
          {
            "index": "03",
            "title": "Clear mission",
            "body": "Complete Mission CLEAR with Beomi."
          }
        ],
        "closingTitle": "Seoul is already an operation zone.",
        "closingBody": "The independent site for agent registration and final reports is being prepared."
      }
    }
  },
  "ja": {
    "meta": {
      "title": "Whale Land \u2014 \u697d\u3057\u3044\u30a2\u30a4\u30c7\u30a2\u3092\u30b5\u30fc\u30d3\u30b9\u306b\u3059\u308b\u4f1a\u793e",
      "description": "Whale Land\u306f\u3001\u697d\u3057\u304f\u904a\u3073\u5fc3\u306e\u3042\u308b\u30a2\u30a4\u30c7\u30a2\u3067\u4e16\u754c\u3092\u3082\u3063\u3068\u591a\u69d8\u3067\u5e78\u305b\u306b\u3059\u308b\u30b5\u30fc\u30d3\u30b9\u3092\u3064\u304f\u308a\u307e\u3059\u3002"
    },
    "common": {
      "navCompany": "\u4f1a\u793e\u7d39\u4ecb",
      "navServiceIntro": "\u30b5\u30fc\u30d3\u30b9\u7d39\u4ecb",
      "navServiceList": "\u30b5\u30fc\u30d3\u30b9\u4e00\u89a7",
      "navContact": "\u304a\u554f\u3044\u5408\u308f\u305b",
      "backHome": "Whale Land\u3078\u623b\u308b",
      "officialSite": "\u516c\u5f0f\u30b5\u30a4\u30c8",
      "learnMore": "\u8a73\u3057\u304f\u898b\u308b",
      "externalNotice": "\u72ec\u7acb\u3057\u305f\u30b5\u30fc\u30d3\u30b9\u30b5\u30a4\u30c8\u3078\u79fb\u52d5\u3057\u307e\u3059\u3002",
      "contactPhone": "070-8028-3008",
      "contactEmail": "contact@whalelandkr.com",
      "footerLine": "Fun ideas, useful services, happier moments.",
      "copyright": "\u00a9 2026 Whale Land. All rights reserved."
    },
    "home": {
      "logoKicker": "WHALE LAND / IDEA COMPANY",
      "logoNote": "SEOUL \u00b7 IDEAS IN MOTION",
      "introEyebrow": "ABOUT WHALE LAND",
      "introTitle": "\u697d\u3057\u304f\u904a\u3073\u5fc3\u306e\u3042\u308b\u30a2\u30a4\u30c7\u30a2\u3067\u3001\u4e16\u754c\u3092\u5c11\u3057\u3060\u3051\u591a\u69d8\u3067\u5e78\u305b\u306b\u3002",
      "introBody": "Whale Land\u306f\u3001\u65e5\u5e38\u3084\u65c5\u306e\u4e2d\u306b\u5c0f\u3055\u306a\u697d\u3057\u3055\u3092\u52a0\u3048\u308b\u4f1a\u793e\u3092\u76ee\u6307\u3057\u3066\u3044\u307e\u3059\u3002\n\u6280\u8853\u3001\u7269\u8a9e\u3001\u30ad\u30e3\u30e9\u30af\u30bf\u30fc\u3001\u30ea\u30a2\u30eb\u306a\u4f53\u9a13\u3092\u81ea\u7531\u306b\u7d44\u307f\u5408\u308f\u305b\u3001\u65b0\u3057\u3044\u30b5\u30fc\u30d3\u30b9\u3092\u5b9f\u9a13\u3057\u306a\u304c\u3089\u3064\u304f\u308a\u307e\u3059\u3002\n\u4eca\u3042\u308b\u30b5\u30fc\u30d3\u30b9\u306f\u5b8c\u6210\u5f62\u3067\u306f\u306a\u304f\u3001\u5909\u5316\u3057\u7d9a\u3051\u308bWhale Land\u306e\u73fe\u5728\u306e\u59ff\u3067\u3059\u3002",
      "serviceSectionEyebrow": "SERVICE INTRODUCTION",
      "serviceLinkCta": "\u30b5\u30fc\u30d3\u30b9\u30da\u30fc\u30b8\u3092\u898b\u308b",
      "serviceListEyebrow": "SERVICE HUB",
      "serviceListTitle": "\u4eca\u51fa\u4f1a\u3048\u308bWhale Land\u306e\u30b5\u30fc\u30d3\u30b9",
      "serviceListBody": "\u305d\u308c\u305e\u308c\u306e\u30b5\u30fc\u30d3\u30b9\u306f\u3001\u72ec\u81ea\u306e\u4e16\u754c\u89b3\u3068\u5f79\u5272\u3092\u6301\u3064\u72ec\u7acb\u3057\u305f\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067\u3059\u3002\u65b0\u3057\u3044\u30b5\u30fc\u30d3\u30b9\u304c\u751f\u307e\u308c\u305f\u3089\u3001\u3053\u306e\u30cf\u30d6\u306b\u81ea\u7136\u306b\u8ffd\u52a0\u3055\u308c\u307e\u3059\u3002",
      "contactEyebrow": "CONTACT WHALE LAND",
      "contactTitle": "\u65b0\u3057\u3044\u63d0\u6848\u3001\u5354\u696d\u3001\u304a\u554f\u3044\u5408\u308f\u305b\u3092\u304a\u5f85\u3061\u3057\u3066\u3044\u307e\u3059\u3002",
      "contactBody": "\u30b5\u30fc\u30d3\u30b9\u5229\u7528\u3001\u63d0\u643a\u3001\u5236\u4f5c\u3001\u4e8b\u696d\u306b\u95a2\u3059\u308b\u304a\u554f\u3044\u5408\u308f\u305b\u306f\u3001\u4e0b\u8a18\u306e\u9023\u7d61\u5148\u3078\u304a\u9001\u308a\u304f\u3060\u3055\u3044\u3002\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306f\u30dc\u30bf\u30f3\u3067\u30b3\u30d4\u30fc\u3067\u304d\u307e\u3059\u3002",
      "contactPhoneLabel": "\u96fb\u8a71",
      "contactEmailLabel": "\u30e1\u30fc\u30eb",
      "contactCopyEmail": "\u554f\u3044\u5408\u308f\u305b\u30e1\u30fc\u30eb\u3092\u30b3\u30d4\u30fc",
      "contactCopiedEmail": "\u30e1\u30fc\u30eb\u3092\u30b3\u30d4\u30fc\u3057\u307e\u3057\u305f",
      "featuredServiceSlugs": [
        "korean-birth-type",
        "haedurio",
        "covert"
      ],
      "principles": []
    },
    "services": {
      "korean-birth-type": {
        "slug": "korean-birth-type",
        "order": "01",
        "theme": "birth",
        "accent": "#8b6bff",
        "illustration": "birth-type.svg",
        "status": "\u516c\u958b\u4e2d",
        "category": "SELF-DISCOVERY",
        "title": "Korean Birth Type",
        "cardTitle": "\u97d3\u56fd\u5f0f\u306e\u56db\u67f1\u63a8\u547d\u3067\u81ea\u5206\u3092\u8a66\u3057\u3066\u307f\u308b\u3002",
        "summary": "\u3042\u306a\u305f\u306f\u81ea\u5206\u306e\u3053\u3068\u3092\u672c\u5f53\u306b\u77e5\u3063\u3066\u3044\u307e\u3059\u304b\uff1f \u97d3\u56fd\u5f0f\u306e\u56db\u67f1\u63a8\u547d\u3067\u81ea\u5206\u3092\u8a66\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\u3082\u3057\u304b\u3059\u308b\u3068\u3001\u672c\u5f53\u306e\u604b\u3084\u904b\u306e\u30d2\u30f3\u30c8\u304c\u898b\u3064\u304b\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002",
        "homeEyebrow": "KOREAN BIRTH TYPE",
        "homeTitle": "\u3042\u306a\u305f\u306f\u81ea\u5206\u306e\u3053\u3068\u3092\u672c\u5f53\u306b\u77e5\u3063\u3066\u3044\u307e\u3059\u304b\uff1f",
        "homeDescription": "\u97d3\u56fd\u5f0f\u306e\u56db\u67f1\u63a8\u547d\u3067\u81ea\u5206\u3092\u8a66\u3057\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002\u672c\u5f53\u306e\u604b\u3084\u904b\u306e\u30d2\u30f3\u30c8\u304c\u898b\u3064\u304b\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002",
        "heroTitle": "\u97d3\u56fd\u5f0f\u306e\u56db\u67f1\u63a8\u547d\u3067\u81ea\u5206\u3092\u8a66\u3057\u3066\u307f\u308b\u3002",
        "heroLead": "Korean Birth Type\u306f\u3001\u56db\u67f1\u63a8\u547d\u3092\u91cd\u3044\u4e88\u8a00\u3067\u306f\u306a\u304f\u3001\u81ea\u5206\u3092\u77e5\u308b\u305f\u3081\u306e\u697d\u3057\u3044\u30c6\u30b9\u30c8\u306e\u3088\u3046\u306b\u4f53\u9a13\u3067\u304d\u308b\u81ea\u5df1\u7406\u89e3\u30b5\u30fc\u30d3\u30b9\u3067\u3059\u3002",
        "visualCaption": "A playful self-reading system inspired by Korean saju.",
        "externalUrl": "https://koreanbirthtype.com",
        "externalCta": "Korean Birth Type\u3092\u59cb\u3081\u308b",
        "tags": [
          "SELF-DISCOVERY",
          "SAJU",
          "DIGITAL CARDS"
        ],
        "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
        "statementTitle": "\u4e88\u8a00\u3088\u308a\u8efd\u304f\u3001\u5fc3\u7406\u30c6\u30b9\u30c8\u3088\u308a\u6df1\u304f\u3002",
        "statementBody": "\u751f\u5e74\u6708\u65e5\u3068\u6642\u9593\u304b\u3089\u59cb\u307e\u308a\u307e\u3059\u304c\u3001\u672a\u6765\u3092\u6c7a\u3081\u3064\u3051\u308b\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u65e5\u67f1\u3001\u4e94\u884c\u3001\u95a2\u4fc2\u6027\u3001\u904b\u306e\u6d41\u308c\u3092\u30ab\u30fc\u30c9\u306e\u3088\u3046\u306b\u898b\u305b\u3001\u81ea\u5206\u3092\u65b0\u3057\u304f\u898b\u308b\u304d\u3063\u304b\u3051\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002",
        "featuresTitle": "\u30ab\u30fc\u30c9\u3067\u8aad\u3080\u81ea\u5206\u306e\u69cb\u9020",
        "features": [
          {
            "index": "01",
            "title": "\u97d3\u56fd\u5f0f\u30ea\u30fc\u30c7\u30a3\u30f3\u30b0",
            "body": "\u56db\u67f1\u63a8\u547d\u306e\u69cb\u9020\u3092\u73fe\u4ee3\u7684\u306a\u8a00\u8449\u3068\u30ab\u30fc\u30c9\u4f53\u9a13\u306b\u5909\u63db\u3057\u307e\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u604b\u3068\u904b\u306e\u30d2\u30f3\u30c8",
            "body": "\u95a2\u4fc2\u6027\u3001\u50be\u5411\u3001\u6d41\u308c\u3092\u8efd\u3084\u304b\u3067\u8a18\u61b6\u306b\u6b8b\u308b\u5f62\u3067\u898b\u305b\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "\u30e2\u30d0\u30a4\u30eb\u4fdd\u5b58",
            "body": "\u7d50\u679c\u3092\u30ab\u30fc\u30c9\u306e\u3088\u3046\u306b\u8aad\u307f\u3001\u6c17\u306b\u306a\u308b\u90e8\u5206\u3092\u4fdd\u5b58\u3067\u304d\u307e\u3059\u3002"
          }
        ],
        "processEyebrow": "HOW IT FLOWS",
        "processTitle": "\u5165\u529b\u3057\u3066\u3001\u8aad\u3093\u3067\u3001\u4fdd\u5b58\u3057\u307e\u3059\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u751f\u5e74\u6708\u65e5\u3092\u5165\u529b",
            "body": "\u30ea\u30fc\u30c7\u30a3\u30f3\u30b0\u306b\u5fc5\u8981\u306a\u57fa\u672c\u60c5\u5831\u3092\u5165\u529b\u3057\u307e\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u30ab\u30fc\u30c9\u30ea\u30fc\u30c7\u30a3\u30f3\u30b0",
            "body": "\u56db\u67f1\u63a8\u547d\u30d9\u30fc\u30b9\u306e\u89e3\u91c8\u304c\u30ab\u30fc\u30c9\u306e\u6d41\u308c\u3067\u5c55\u958b\u3055\u308c\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "\u7d50\u679c\u3092\u78ba\u8a8d",
            "body": "\u5370\u8c61\u306b\u6b8b\u3063\u305f\u30ab\u30fc\u30c9\u3092\u4fdd\u5b58\u3057\u3066\u3001\u3042\u3068\u3067\u898b\u8fd4\u305b\u307e\u3059\u3002"
          }
        ],
        "closingTitle": "\u3042\u306a\u305f\u306eKorean Birth Type\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
        "closingBody": "\u81ea\u5206\u3092\u3088\u304f\u77e5\u3063\u3066\u3044\u308b\u3068\u601d\u3063\u3066\u3044\u3066\u3082\u3001\u610f\u5916\u306a\u30d2\u30f3\u30c8\u304c\u898b\u3064\u304b\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002"
      },
      "haedurio": {
        "slug": "haedurio",
        "order": "02",
        "theme": "haedurio",
        "accent": "#25b7c7",
        "illustration": "haedurio.svg",
        "status": "\u516c\u958b\u4e2d",
        "category": "TRAVEL SUPPORT",
        "title": "Haedurio",
        "cardTitle": "\u97d3\u56fd\u3067\u56f0\u3063\u305f\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u304b\uff1f",
        "summary": "\u97d3\u56fd\u3067\u56f0\u3063\u305f\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u304b\uff1f \u4f55\u3067\u3082\u89e3\u6c7a\u3059\u308b\u30d5\u30a3\u30af\u30b5\u30fc\u3001Haedurio\u3092\u4f7f\u3063\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002",
        "homeEyebrow": "HAEDURIO",
        "homeTitle": "\u97d3\u56fd\u3067\u56f0\u3063\u305f\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u304b\uff1f",
        "homeDescription": "\u4f55\u3067\u3082\u89e3\u6c7a\u3059\u308b\u30d5\u30a3\u30af\u30b5\u30fc\u3001Haedurio\u3092\u4f7f\u3063\u3066\u307f\u3066\u304f\u3060\u3055\u3044\u3002",
        "heroTitle": "\u97d3\u56fd\u65c5\u884c\u3067\u56f0\u3063\u305f\u77ac\u9593\u3092\u3001\u73fe\u5730\u3067\u89e3\u6c7a\u3078\u3002",
        "heroLead": "Haedurio\u306f\u3001\u97d3\u56fd\u65c5\u884c\u4e2d\u306e\u4e88\u7d04\u3001\u8cfc\u5165\u3001\u914d\u9001\u3001\u7d1b\u5931\u306a\u3069\u4e88\u60f3\u5916\u306e\u554f\u984c\u3092\u6574\u7406\u3057\u3001\u89e3\u6c7a\u306e\u9053\u7b4b\u3092\u63a2\u3059\u73fe\u5730\u30b5\u30dd\u30fc\u30c8\u30b5\u30fc\u30d3\u30b9\u3067\u3059\u3002",
        "visualCaption": "Local help for the moments that interrupt your trip.",
        "externalUrl": "https://haedurio.com",
        "externalCta": "Haedurio\u3092\u898b\u308b",
        "tags": [
          "LOCAL SUPPORT",
          "TRAVEL HELP",
          "KOREA"
        ],
        "statementEyebrow": "KEEP THE TRIP MOVING",
        "statementTitle": "\u56f0\u308b\u6642\u9593\u306f\u77ed\u304f\u3001\u65c5\u306f\u7d9a\u304f\u3088\u3046\u306b\u3002",
        "statementBody": "\u6163\u308c\u306a\u3044\u8a00\u8a9e\u3084\u74b0\u5883\u3067\u306f\u3001\u5c0f\u3055\u306a\u554f\u984c\u3067\u3082\u65c5\u5168\u4f53\u304c\u6b62\u307e\u3063\u3066\u3057\u307e\u3046\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002Haedurio\u306f\u72b6\u6cc1\u3092\u6574\u7406\u3057\u3001\u73fe\u5730\u306e\u6587\u8108\u3092\u78ba\u8a8d\u3057\u3066\u3001\u6b21\u306e\u884c\u52d5\u3092\u6c7a\u3081\u3089\u308c\u308b\u3088\u3046\u652f\u63f4\u3057\u307e\u3059\u3002",
        "featuresTitle": "\u554f\u984c\u8aac\u660e\u304b\u3089\u89e3\u6c7a\u30eb\u30fc\u30c8\u307e\u3067",
        "features": [
          {
            "index": "01",
            "title": "\u72b6\u6cc1\u6574\u7406",
            "body": "\u8907\u96d1\u306a\u72b6\u6cc1\u3082\u3001\u5fc5\u8981\u306a\u60c5\u5831\u304b\u3089\u9806\u756a\u306b\u6574\u7406\u3067\u304d\u308b\u3088\u3046\u6848\u5185\u3057\u307e\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u73fe\u5730\u57fa\u6e96\u3067\u78ba\u8a8d",
            "body": "\u97d3\u56fd\u306e\u4e88\u7d04\u3001\u8cfc\u5165\u3001\u914d\u9001\u74b0\u5883\u3092\u57fa\u6e96\u306b\u53ef\u80fd\u306a\u9078\u629e\u80a2\u3092\u78ba\u8a8d\u3057\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "\u6b21\u306e\u884c\u52d5\u3078\u63a5\u7d9a",
            "body": "\u5358\u306a\u308b\u7ffb\u8a33\u3092\u8d85\u3048\u3066\u3001\u5b9f\u969b\u306b\u4f55\u3092\u3059\u3079\u304d\u304b\u3092\u4f1d\u3048\u307e\u3059\u3002"
          }
        ],
        "processEyebrow": "HOW IT WORKS",
        "processTitle": "\u554f\u984c\u304c\u8d77\u304d\u305f\u77ac\u9593\u304b\u3089\u3001\u65c5\u3078\u623b\u308b\u307e\u3067\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u72b6\u6cc1\u5171\u6709",
            "body": "\u4f55\u304c\u8d77\u304d\u305f\u306e\u304b\u3001\u5fc5\u8981\u306a\u5185\u5bb9\u3092\u4f1d\u3048\u307e\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u89e3\u6c7a\u30eb\u30fc\u30c8\u78ba\u8a8d",
            "body": "\u53ef\u80fd\u306a\u65b9\u6cd5\u3068\u5fc5\u8981\u306a\u624b\u9806\u3092\u73fe\u5730\u57fa\u6e96\u3067\u78ba\u8a8d\u3057\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "\u9032\u884c\u6848\u5185",
            "body": "\u9078\u3093\u3060\u65b9\u5411\u306b\u6cbf\u3063\u3066\u6b21\u306e\u6bb5\u968e\u3078\u9032\u307f\u307e\u3059\u3002"
          }
        ],
        "closingTitle": "\u65c5\u306e\u554f\u984c\u306f\u77ed\u304f\u3001\u601d\u3044\u51fa\u306f\u9577\u304f\u3002",
        "closingBody": "\u97d3\u56fd\u3067\u52a9\u3051\u304c\u5fc5\u8981\u306a\u77ac\u9593\u3001Haedurio\u306b\u72b6\u6cc1\u3092\u77e5\u3089\u305b\u3066\u304f\u3060\u3055\u3044\u3002"
      },
      "covert": {
        "slug": "covert",
        "order": "03",
        "theme": "covert",
        "accent": "#52616d",
        "illustration": "covert.svg",
        "status": "\u6e96\u5099\u4e2d",
        "category": "MISSION TRAVEL",
        "title": "Beomi Stamp Tour",
        "cardTitle": "\u666e\u901a\u306e\u65c5\u884c\u306f\u3082\u3046\u7d42\u308f\u308a\uff01",
        "summary": "\u666e\u901a\u306e\u65c5\u884c\u306f\u3082\u3046\u7d42\u308f\u308a\uff01 \u3053\u308c\u304b\u3089\u306f\u6f5c\u5165\u4fb5\u900f\u30a2\u30af\u30b7\u30e7\u30f3\u89b3\u5149\u306e\u6642\u4ee3\u3067\u3059\u3002Beomi\u3068\u4e00\u7dd2\u306bMission CLEAR\uff01",
        "homeEyebrow": "BEOMI STAMP TOUR",
        "homeTitle": "\u666e\u901a\u306e\u65c5\u884c\u306f\u3082\u3046\u7d42\u308f\u308a\uff01",
        "homeDescription": "\u3053\u308c\u304b\u3089\u306f\u6f5c\u5165\u4fb5\u900f\u30a2\u30af\u30b7\u30e7\u30f3\u89b3\u5149\u306e\u6642\u4ee3\u3067\u3059\u3002Beomi\u3068\u4e00\u7dd2\u306bMission CLEAR\uff01",
        "heroTitle": "\u30bd\u30a6\u30eb\u65c5\u884c\u3092\u79d8\u5bc6\u30df\u30c3\u30b7\u30e7\u30f3\u306b\u5909\u3048\u308b\u30b9\u30bf\u30f3\u30d7\u30c4\u30a2\u30fc\u3002",
        "heroLead": "Beomi Stamp Tour\u306f\u3001\u30bd\u30a6\u30eb\u306e\u5834\u6240\u3092\u4f5c\u6226\u533a\u57df\u306e\u3088\u3046\u306b\u63a2\u7d22\u3057\u3001\u30d1\u30b9\u30dd\u30fc\u30c8\u578b\u30df\u30c3\u30b7\u30e7\u30f3\u30d6\u30c3\u30af\u306b\u30b9\u30bf\u30f3\u30d7\u3068\u8a18\u9332\u3092\u6b8b\u3059\u4f53\u9a13\u578b\u89b3\u5149\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u3067\u3059\u3002",
        "visualCaption": "A field mission hidden inside an ordinary city trip.",
        "externalUrl": "/covert/?lang=kr",
        "externalCta": "Beomi Stamp Tour\u3078",
        "tags": [
          "STAMP TOUR",
          "SEOUL",
          "MISSION CLEAR"
        ],
        "statementEyebrow": "YOUR CITY. YOUR MISSION.",
        "statementTitle": "\u89b3\u5149\u5730\u3092\u30c1\u30a7\u30c3\u30af\u3059\u308b\u65c5\u304b\u3089\u3001\u30df\u30c3\u30b7\u30e7\u30f3\u3092\u9054\u6210\u3059\u308b\u65c5\u3078\u3002",
        "statementBody": "\u6709\u540d\u306a\u5834\u6240\u3092\u898b\u308b\u3060\u3051\u3067\u306f\u7d42\u308f\u308a\u307e\u305b\u3093\u3002\u30df\u30c3\u30b7\u30e7\u30f3\u30d6\u30c3\u30af\u3092\u958b\u304d\u3001\u4f5c\u6226\u533a\u57df\u3092\u8a2a\u308c\u3001\u30b9\u30bf\u30f3\u30d7\u3068\u73fe\u5730\u8a18\u9332\u3092\u96c6\u3081\u308b\u3053\u3068\u3067\u3001\u30bd\u30a6\u30eb\u65c5\u884c\u5168\u4f53\u304c\u3072\u3068\u3064\u306e\u79d8\u5bc6\u4efb\u52d9\u306b\u306a\u308a\u307e\u3059\u3002",
        "featuresTitle": "\u624b\u306b\u6301\u3063\u3066\u6b69\u304f\u79d8\u5bc6\u4f5c\u6226",
        "features": [
          {
            "index": "01",
            "title": "\u30d1\u30b9\u30dd\u30fc\u30c8\u578b\u30df\u30c3\u30b7\u30e7\u30f3\u30d6\u30c3\u30af",
            "body": "\u4f5c\u6226\u30d6\u30ea\u30fc\u30d5\u30a3\u30f3\u30b0\u3001\u5834\u6240\u60c5\u5831\u3001\u8a18\u9332\u30b9\u30da\u30fc\u30b9\u3092\u5165\u308c\u305f\u5b9f\u7269\u518a\u5b50\u3067\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u30bd\u30a6\u30eb\u4f5c\u6226\u533a\u57df",
            "body": "\u4f1d\u7d71\u3001\u30b7\u30e7\u30c3\u30d4\u30f3\u30b0\u3001\u98df\u3001\u591c\u666f\u3001\u8857\u306e\u6587\u5316\u3092\u5225\u3005\u306e\u30df\u30c3\u30b7\u30e7\u30f3\u306e\u3088\u3046\u306b\u63a2\u7d22\u3057\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "Mission CLEAR",
            "body": "\u30b9\u30bf\u30f3\u30d7\u3068\u8a18\u9332\u3092\u96c6\u3081\u3001\u81ea\u5206\u3060\u3051\u306e\u30bd\u30a6\u30eb\u4f5c\u6226\u7d50\u679c\u3092\u5b8c\u6210\u3055\u305b\u307e\u3059\u3002"
          }
        ],
        "processEyebrow": "MISSION FLOW",
        "processTitle": "\u30d6\u30ea\u30fc\u30d5\u30a3\u30f3\u30b0\u3092\u53d7\u3051\u3001\u73fe\u5834\u3078\u79fb\u52d5\u3057\u3001\u8a18\u9332\u3092\u6b8b\u3057\u307e\u3059\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u30d6\u30ea\u30fc\u30d5\u30a3\u30f3\u30b0\u53d7\u9818",
            "body": "\u30df\u30c3\u30b7\u30e7\u30f3\u30d6\u30c3\u30af\u3067\u30bd\u30a6\u30eb\u306e\u4f5c\u6226\u533a\u57df\u3068\u6307\u4ee4\u3092\u78ba\u8a8d\u3057\u307e\u3059\u3002"
          },
          {
            "index": "02",
            "title": "\u73fe\u5834\u4f5c\u6226",
            "body": "\u90fd\u5e02\u3092\u79fb\u52d5\u3057\u306a\u304c\u3089\u30b9\u30bf\u30f3\u30d7\u3068\u81ea\u5206\u3060\u3051\u306e\u8a18\u9332\u3092\u96c6\u3081\u307e\u3059\u3002"
          },
          {
            "index": "03",
            "title": "\u4efb\u52d9\u5b8c\u4e86",
            "body": "Beomi\u3068\u4e00\u7dd2\u306bMission CLEAR\u3092\u5b8c\u6210\u3055\u305b\u307e\u3059\u3002"
          }
        ],
        "closingTitle": "\u30bd\u30a6\u30eb\u306f\u3059\u3067\u306b\u4f5c\u6226\u533a\u57df\u3067\u3059\u3002",
        "closingBody": "\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u767b\u9332\u3068\u6700\u7d42\u5831\u544a\u306e\u305f\u3081\u306e\u72ec\u7acb\u30b5\u30a4\u30c8\u306f\u6e96\u5099\u4e2d\u3067\u3059\u3002"
      }
    }
  },
  "zh-cn": {
    "meta": {
      "title": "Whale Land \u2014 \u628a\u6709\u8da3\u521b\u610f\u53d8\u6210\u670d\u52a1\u7684\u516c\u53f8",
      "description": "Whale Land \u7528\u597d\u73a9\u53c8\u5feb\u4e50\u7684\u521b\u610f\uff0c\u6253\u9020\u8ba9\u4e16\u754c\u66f4\u591a\u6837\u3001\u66f4\u5e78\u798f\u7684\u670d\u52a1\u3002"
    },
    "common": {
      "navCompany": "\u516c\u53f8\u4ecb\u7ecd",
      "navServiceIntro": "\u670d\u52a1\u4ecb\u7ecd",
      "navServiceList": "\u670d\u52a1\u5217\u8868",
      "navContact": "\u8054\u7cfb",
      "backHome": "\u8fd4\u56de Whale Land",
      "officialSite": "\u5b98\u65b9\u7f51\u7ad9",
      "learnMore": "\u4e86\u89e3\u8be6\u60c5",
      "externalNotice": "\u5373\u5c06\u524d\u5f80\u72ec\u7acb\u670d\u52a1\u7f51\u7ad9\u3002",
      "contactPhone": "070-8028-3008",
      "contactEmail": "contact@whalelandkr.com",
      "footerLine": "Fun ideas, useful services, happier moments.",
      "copyright": "\u00a9 2026 Whale Land. All rights reserved."
    },
    "home": {
      "logoKicker": "WHALE LAND / IDEA COMPANY",
      "logoNote": "SEOUL \u00b7 IDEAS IN MOTION",
      "introEyebrow": "ABOUT WHALE LAND",
      "introTitle": "\u7528\u597d\u73a9\u53c8\u5feb\u4e50\u7684\u521b\u610f\uff0c\u8ba9\u4e16\u754c\u53d8\u5f97\u66f4\u591a\u6837\u3001\u66f4\u5e78\u798f\u3002",
      "introBody": "Whale Land \u5e0c\u671b\u5728\u65e5\u5e38\u4e0e\u65c5\u884c\u4e2d\u52a0\u5165\u4e00\u70b9\u5c0f\u5c0f\u7684\u4e50\u8da3\u3002\n\u6211\u4eec\u81ea\u7531\u7ed3\u5408\u6280\u672f\u3001\u6545\u4e8b\u3001\u89d2\u8272\u548c\u7ebf\u4e0b\u4f53\u9a8c\uff0c\u4e0d\u65ad\u5b9e\u9a8c\u5e76\u521b\u9020\u65b0\u7684\u670d\u52a1\u3002\n\u73b0\u5728\u770b\u5230\u7684\u670d\u52a1\u4e0d\u662f\u56fa\u5b9a\u9635\u5bb9\uff0c\u800c\u662f\u6301\u7eed\u53d8\u5316\u548c\u6269\u5c55\u4e2d\u7684 Whale Land\u3002",
      "serviceSectionEyebrow": "SERVICE INTRODUCTION",
      "serviceLinkCta": "\u67e5\u770b\u670d\u52a1\u9875\u9762",
      "serviceListEyebrow": "SERVICE HUB",
      "serviceListTitle": "\u73b0\u5728\u53ef\u4ee5\u4f53\u9a8c\u7684 Whale Land \u670d\u52a1",
      "serviceListBody": "\u6bcf\u9879\u670d\u52a1\u90fd\u662f\u62e5\u6709\u72ec\u7acb\u4e16\u754c\u89c2\u548c\u529f\u80fd\u7684\u9879\u76ee\u3002\u672a\u6765\u6709\u65b0\u670d\u52a1\u65f6\uff0c\u4e5f\u4f1a\u81ea\u7136\u52a0\u5165\u8fd9\u4e2a\u670d\u52a1\u4e2d\u67a2\u3002",
      "contactEyebrow": "CONTACT WHALE LAND",
      "contactTitle": "\u6b22\u8fce\u65b0\u7684\u63d0\u6848\u3001\u5408\u4f5c\u4e0e\u54a8\u8be2\u3002",
      "contactBody": "\u5982\u6709\u670d\u52a1\u4f7f\u7528\u3001\u5408\u4f5c\u3001\u5236\u4f5c\u6216\u5546\u52a1\u54a8\u8be2\uff0c\u8bf7\u901a\u8fc7\u4e0b\u65b9\u8054\u7cfb\u65b9\u5f0f\u4e0e\u6211\u4eec\u8054\u7cfb\u3002\u90ae\u7bb1\u5730\u5740\u53ef\u4ee5\u4e00\u952e\u590d\u5236\u3002",
      "contactPhoneLabel": "\u7535\u8bdd",
      "contactEmailLabel": "\u90ae\u7bb1",
      "contactCopyEmail": "\u590d\u5236\u54a8\u8be2\u90ae\u7bb1",
      "contactCopiedEmail": "\u90ae\u7bb1\u5df2\u590d\u5236",
      "featuredServiceSlugs": [
        "korean-birth-type",
        "haedurio",
        "covert"
      ],
      "principles": []
    },
    "services": {
      "korean-birth-type": {
        "slug": "korean-birth-type",
        "order": "01",
        "theme": "birth",
        "accent": "#8b6bff",
        "illustration": "birth-type.svg",
        "status": "\u5df2\u4e0a\u7ebf",
        "category": "SELF-DISCOVERY",
        "title": "Korean Birth Type",
        "cardTitle": "\u7528\u97e9\u5f0f\u56db\u67f1\u89e3\u8bfb\u6d4b\u8bd5\u4f60\u81ea\u5df1\u3002",
        "summary": "\u4f60\u771f\u7684\u4e86\u89e3\u81ea\u5df1\u5417\uff1f \u7528\u97e9\u5f0f\u56db\u67f1\u89e3\u8bfb\u6d4b\u8bd5\u4f60\u81ea\u5df1\u3002\u4e5f\u8bb8\u4f60\u4f1a\u53d1\u73b0\u5173\u4e8e\u771f\u7231\u4e0e\u8fd0\u6c14\u7684\u7ebf\u7d22\u3002",
        "homeEyebrow": "KOREAN BIRTH TYPE",
        "homeTitle": "\u4f60\u771f\u7684\u4e86\u89e3\u81ea\u5df1\u5417\uff1f",
        "homeDescription": "\u7528\u97e9\u5f0f\u56db\u67f1\u89e3\u8bfb\u6d4b\u8bd5\u4f60\u81ea\u5df1\u3002\u4e5f\u8bb8\u4f60\u4f1a\u53d1\u73b0\u5173\u4e8e\u771f\u7231\u4e0e\u8fd0\u6c14\u7684\u7ebf\u7d22\u3002",
        "heroTitle": "\u7528\u97e9\u5f0f\u56db\u67f1\u89e3\u8bfb\u6d4b\u8bd5\u4f60\u81ea\u5df1\u3002",
        "heroLead": "Korean Birth Type \u5c06\u56db\u67f1\u547d\u7406\u53d8\u6210\u4e00\u79cd\u8f7b\u677e\u7684\u81ea\u6211\u7406\u89e3\u4f53\u9a8c\uff0c\u800c\u4e0d\u662f\u6c89\u91cd\u7684\u9884\u8a00\u3002",
        "visualCaption": "A playful self-reading system inspired by Korean saju.",
        "externalUrl": "https://koreanbirthtype.com",
        "externalCta": "\u5f00\u59cb Korean Birth Type",
        "tags": [
          "SELF-DISCOVERY",
          "SAJU",
          "DIGITAL CARDS"
        ],
        "statementEyebrow": "A DIFFERENT WAY TO READ YOURSELF",
        "statementTitle": "\u6bd4\u9884\u8a00\u66f4\u8f7b\u677e\uff0c\u6bd4\u6d4b\u8bd5\u66f4\u6df1\u5165\u3002",
        "statementBody": "\u4f53\u9a8c\u4ece\u51fa\u751f\u65e5\u671f\u548c\u65f6\u95f4\u5f00\u59cb\uff0c\u4f46\u5e76\u4e0d\u662f\u4e3a\u4e86\u65ad\u5b9a\u672a\u6765\u3002\u5b83\u628a\u65e5\u67f1\u3001\u4e94\u884c\u3001\u5173\u7cfb\u548c\u8fd0\u52bf\u8282\u594f\u8f6c\u5316\u4e3a\u5361\u7247\uff0c\u5e2e\u52a9\u4f60\u7528\u65b0\u7684\u89d2\u5ea6\u770b\u89c1\u81ea\u5df1\u3002",
        "featuresTitle": "\u7528\u5361\u7247\u9605\u8bfb\u81ea\u5df1\u7684\u7ed3\u6784",
        "features": [
          {
            "index": "01",
            "title": "\u97e9\u5f0f\u89e3\u8bfb",
            "body": "\u5c06\u56db\u67f1\u7ed3\u6784\u8f6c\u5316\u4e3a\u73b0\u4ee3\u8bed\u8a00\u548c\u5361\u7247\u4f53\u9a8c\u3002"
          },
          {
            "index": "02",
            "title": "\u7231\u60c5\u4e0e\u8fd0\u6c14\u7684\u63d0\u793a",
            "body": "\u4ee5\u8f7b\u677e\u4f46\u4ee4\u4eba\u5370\u8c61\u6df1\u523b\u7684\u65b9\u5f0f\u5448\u73b0\u5173\u7cfb\u3001\u503e\u5411\u4e0e\u8282\u594f\u3002"
          },
          {
            "index": "03",
            "title": "\u79fb\u52a8\u7aef\u4fdd\u5b58",
            "body": "\u50cf\u770b\u5361\u7247\u4e00\u6837\u9605\u8bfb\u7ed3\u679c\uff0c\u5e76\u4fdd\u5b58\u8ba9\u4f60\u5728\u610f\u7684\u90e8\u5206\u3002"
          }
        ],
        "processEyebrow": "HOW IT FLOWS",
        "processTitle": "\u8f93\u5165\u3001\u9605\u8bfb\u3001\u4fdd\u5b58\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u8f93\u5165\u51fa\u751f\u4fe1\u606f",
            "body": "\u8f93\u5165\u89e3\u8bfb\u6240\u9700\u7684\u57fa\u672c\u4fe1\u606f\u3002"
          },
          {
            "index": "02",
            "title": "\u5361\u7247\u89e3\u8bfb",
            "body": "\u57fa\u4e8e\u56db\u67f1\u7684\u89e3\u91ca\u4f1a\u4ee5\u5361\u7247\u5f62\u5f0f\u5c55\u5f00\u3002"
          },
          {
            "index": "03",
            "title": "\u67e5\u770b\u7ed3\u679c",
            "body": "\u4fdd\u5b58\u5370\u8c61\u6df1\u523b\u7684\u5361\u7247\uff0c\u4e4b\u540e\u53ef\u4ee5\u518d\u6b21\u67e5\u770b\u3002"
          }
        ],
        "closingTitle": "\u67e5\u770b\u4f60\u7684 Korean Birth Type\u3002",
        "closingBody": "\u5373\u4f7f\u4f60\u4ee5\u4e3a\u5df2\u7ecf\u5f88\u4e86\u89e3\u81ea\u5df1\uff0c\u4e5f\u53ef\u80fd\u53d1\u73b0\u65b0\u7684\u7ebf\u7d22\u3002"
      },
      "haedurio": {
        "slug": "haedurio",
        "order": "02",
        "theme": "haedurio",
        "accent": "#25b7c7",
        "illustration": "haedurio.svg",
        "status": "\u5df2\u4e0a\u7ebf",
        "category": "TRAVEL SUPPORT",
        "title": "Haedurio",
        "cardTitle": "\u5728\u97e9\u56fd\u9047\u5230\u56f0\u96be\u4e86\u5417\uff1f",
        "summary": "\u5728\u97e9\u56fd\u9047\u5230\u56f0\u96be\u4e86\u5417\uff1f \u8bd5\u8bd5\u4ec0\u4e48\u90fd\u80fd\u5e2e\u4f60\u89e3\u51b3\u7684\u5e2e\u624b\u670d\u52a1 Haedurio\u3002",
        "homeEyebrow": "HAEDURIO",
        "homeTitle": "\u5728\u97e9\u56fd\u9047\u5230\u56f0\u96be\u4e86\u5417\uff1f",
        "homeDescription": "\u8bd5\u8bd5\u4ec0\u4e48\u90fd\u80fd\u5e2e\u4f60\u89e3\u51b3\u7684\u5e2e\u624b\u670d\u52a1 Haedurio\u3002",
        "heroTitle": "\u97e9\u56fd\u65c5\u884c\u4e2d\u5361\u4f4f\u7684\u65f6\u523b\uff0c\u7531\u5f53\u5730\u652f\u6301\u6765\u89e3\u51b3\u3002",
        "heroLead": "Haedurio \u662f\u4e00\u9879\u5f53\u5730\u652f\u6301\u670d\u52a1\uff0c\u5e2e\u52a9\u65c5\u884c\u8005\u6574\u7406\u5728\u97e9\u56fd\u9047\u5230\u7684\u9884\u7ea6\u3001\u8d2d\u4e70\u3001\u914d\u9001\u3001\u9057\u5931\u7b49\u7a81\u53d1\u95ee\u9898\uff0c\u5e76\u627e\u5230\u4e0b\u4e00\u6b65\u89e3\u51b3\u8def\u5f84\u3002",
        "visualCaption": "Local help for the moments that interrupt your trip.",
        "externalUrl": "https://haedurio.com",
        "externalCta": "\u8bbf\u95ee Haedurio",
        "tags": [
          "LOCAL SUPPORT",
          "TRAVEL HELP",
          "KOREA"
        ],
        "statementEyebrow": "KEEP THE TRIP MOVING",
        "statementTitle": "\u8ba9\u9ebb\u70e6\u66f4\u77ed\uff0c\u8ba9\u65c5\u884c\u7ee7\u7eed\u3002",
        "statementBody": "\u5728\u964c\u751f\u8bed\u8a00\u548c\u73af\u5883\u4e2d\uff0c\u5c0f\u95ee\u9898\u4e5f\u53ef\u80fd\u8ba9\u6574\u6bb5\u65c5\u884c\u505c\u4e0b\u6765\u3002Haedurio \u5e2e\u52a9\u6574\u7406\u72b6\u51b5\u3001\u786e\u8ba4\u5f53\u5730\u80cc\u666f\uff0c\u5e76\u9009\u62e9\u4e0b\u4e00\u6b65\u884c\u52a8\u3002",
        "featuresTitle": "\u4ece\u95ee\u9898\u8bf4\u660e\u5230\u89e3\u51b3\u8def\u5f84",
        "features": [
          {
            "index": "01",
            "title": "\u6574\u7406\u72b6\u51b5",
            "body": "\u5373\u4f7f\u60c5\u51b5\u590d\u6742\uff0c\u4e5f\u4f1a\u4ece\u5fc5\u8981\u4fe1\u606f\u5f00\u59cb\u4e00\u6b65\u6b65\u6574\u7406\u3002"
          },
          {
            "index": "02",
            "title": "\u6309\u5f53\u5730\u6807\u51c6\u786e\u8ba4",
            "body": "\u6839\u636e\u97e9\u56fd\u7684\u9884\u7ea6\u3001\u8d2d\u4e70\u548c\u914d\u9001\u73af\u5883\u786e\u8ba4\u53ef\u884c\u9009\u62e9\u3002"
          },
          {
            "index": "03",
            "title": "\u8fde\u63a5\u4e0b\u4e00\u6b65",
            "body": "\u4e0d\u53ea\u662f\u7ffb\u8bd1\uff0c\u8fd8\u5e2e\u52a9\u4f60\u7406\u89e3\u5b9e\u9645\u8be5\u600e\u4e48\u505a\u3002"
          }
        ],
        "processEyebrow": "HOW IT WORKS",
        "processTitle": "\u4ece\u95ee\u9898\u51fa\u73b0\u7684\u77ac\u95f4\uff0c\u5230\u91cd\u65b0\u56de\u5230\u65c5\u7a0b\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u8bf4\u660e\u60c5\u51b5",
            "body": "\u544a\u8bc9\u6211\u4eec\u53d1\u751f\u4e86\u4ec0\u4e48\u548c\u5fc5\u8981\u4fe1\u606f\u3002"
          },
          {
            "index": "02",
            "title": "\u786e\u8ba4\u89e3\u51b3\u8def\u5f84",
            "body": "\u6839\u636e\u5f53\u5730\u60c5\u51b5\u786e\u8ba4\u53ef\u884c\u65b9\u6cd5\u548c\u6240\u9700\u6b65\u9aa4\u3002"
          },
          {
            "index": "03",
            "title": "\u7ee7\u7eed\u63a8\u8fdb",
            "body": "\u6839\u636e\u9009\u62e9\u7684\u65b9\u5411\u8fdb\u5165\u4e0b\u4e00\u6b65\u3002"
          }
        ],
        "closingTitle": "\u8ba9\u65c5\u884c\u7684\u95ee\u9898\u77ed\u4e00\u70b9\uff0c\u8ba9\u56de\u5fc6\u957f\u4e00\u70b9\u3002",
        "closingBody": "\u5728\u97e9\u56fd\u9700\u8981\u5e2e\u52a9\u65f6\uff0c\u8bf7\u544a\u8bc9 Haedurio \u53d1\u751f\u4e86\u4ec0\u4e48\u3002"
      },
      "covert": {
        "slug": "covert",
        "order": "03",
        "theme": "covert",
        "accent": "#52616d",
        "illustration": "covert.svg",
        "status": "\u51c6\u5907\u4e2d",
        "category": "MISSION TRAVEL",
        "title": "Beomi Stamp Tour",
        "cardTitle": "\u544a\u522b\u666e\u901a\u65c5\u884c\uff01",
        "summary": "\u544a\u522b\u666e\u901a\u65c5\u884c\uff01 \u73b0\u5728\u662f\u6f5c\u5165\u6e17\u900f\u52a8\u4f5c\u89c2\u5149\u7684\u65f6\u4ee3\u3002\u548c Beomi \u4e00\u8d77 Mission CLEAR\uff01",
        "homeEyebrow": "BEOMI STAMP TOUR",
        "homeTitle": "\u544a\u522b\u666e\u901a\u65c5\u884c\uff01",
        "homeDescription": "\u73b0\u5728\u662f\u6f5c\u5165\u6e17\u900f\u52a8\u4f5c\u89c2\u5149\u7684\u65f6\u4ee3\u3002\u548c Beomi \u4e00\u8d77 Mission CLEAR\uff01",
        "heroTitle": "\u628a\u9996\u5c14\u65c5\u884c\u53d8\u6210\u79d8\u5bc6\u4efb\u52a1\u7684\u5370\u7ae0\u65c5\u884c\u3002",
        "heroLead": "Beomi Stamp Tour \u662f\u4e00\u9879\u4f53\u9a8c\u578b\u65c5\u6e38\u9879\u76ee\uff0c\u8ba9\u4f60\u50cf\u6267\u884c\u4f5c\u6218\u4e00\u6837\u63a2\u7d22\u9996\u5c14\u5730\u70b9\uff0c\u5e76\u5728\u62a4\u7167\u5f0f\u4efb\u52a1\u624b\u518c\u4e2d\u7559\u4e0b\u5370\u7ae0\u548c\u8bb0\u5f55\u3002",
        "visualCaption": "A field mission hidden inside an ordinary city trip.",
        "externalUrl": "/covert/?lang=kr",
        "externalCta": "\u8fdb\u5165 Beomi Stamp Tour",
        "tags": [
          "STAMP TOUR",
          "SEOUL",
          "MISSION CLEAR"
        ],
        "statementEyebrow": "YOUR CITY. YOUR MISSION.",
        "statementTitle": "\u4ece\u6253\u5361\u666f\u70b9\uff0c\u5230\u5b8c\u6210\u4efb\u52a1\u3002",
        "statementBody": "\u65c5\u884c\u4e0d\u6b62\u662f\u770b\u8457\u540d\u5730\u70b9\u3002\u6253\u5f00\u4efb\u52a1\u624b\u518c\uff0c\u524d\u5f80\u4f5c\u6218\u533a\u57df\uff0c\u6536\u96c6\u5370\u7ae0\u548c\u73b0\u573a\u8bb0\u5f55\uff0c\u6574\u4e2a\u9996\u5c14\u65c5\u884c\u90fd\u4f1a\u53d8\u6210\u4e00\u9879\u79d8\u5bc6\u4efb\u52a1\u3002",
        "featuresTitle": "\u62ff\u5728\u624b\u91cc\u884c\u8d70\u7684\u79d8\u5bc6\u4f5c\u6218",
        "features": [
          {
            "index": "01",
            "title": "\u62a4\u7167\u5f0f\u4efb\u52a1\u624b\u518c",
            "body": "\u5305\u542b\u4f5c\u6218\u7b80\u62a5\u3001\u5730\u70b9\u4fe1\u606f\u548c\u8bb0\u5f55\u7a7a\u95f4\u7684\u5b9e\u4f53\u624b\u518c\u3002"
          },
          {
            "index": "02",
            "title": "\u9996\u5c14\u4f5c\u6218\u533a\u57df",
            "body": "\u628a\u4f20\u7edf\u3001\u8d2d\u7269\u3001\u7f8e\u98df\u3001\u591c\u666f\u548c\u8857\u533a\u6587\u5316\u5f53\u4f5c\u4e0d\u540c\u4efb\u52a1\u6765\u63a2\u7d22\u3002"
          },
          {
            "index": "03",
            "title": "Mission CLEAR",
            "body": "\u6536\u96c6\u5370\u7ae0\u548c\u8bb0\u5f55\uff0c\u5b8c\u6210\u5c5e\u4e8e\u4f60\u7684\u9996\u5c14\u4f5c\u6218\u7ed3\u679c\u3002"
          }
        ],
        "processEyebrow": "MISSION FLOW",
        "processTitle": "\u63a5\u6536\u7b80\u62a5\uff0c\u524d\u5f80\u73b0\u573a\uff0c\u7559\u4e0b\u8bb0\u5f55\u3002",
        "steps": [
          {
            "index": "01",
            "title": "\u63a5\u6536\u7b80\u62a5",
            "body": "\u5728\u4efb\u52a1\u624b\u518c\u4e2d\u786e\u8ba4\u9996\u5c14\u4f5c\u6218\u533a\u57df\u548c\u6307\u4ee4\u3002"
          },
          {
            "index": "02",
            "title": "\u73b0\u573a\u4f5c\u6218",
            "body": "\u5728\u57ce\u5e02\u4e2d\u79fb\u52a8\uff0c\u6536\u96c6\u5370\u7ae0\u548c\u5c5e\u4e8e\u81ea\u5df1\u7684\u8bb0\u5f55\u3002"
          },
          {
            "index": "03",
            "title": "\u4efb\u52a1\u5b8c\u6210",
            "body": "\u548c Beomi \u4e00\u8d77\u5b8c\u6210 Mission CLEAR\u3002"
          }
        ],
        "closingTitle": "\u9996\u5c14\u5df2\u7ecf\u662f\u4f5c\u6218\u533a\u57df\u3002",
        "closingBody": "\u7528\u4e8e\u7279\u5de5\u6ce8\u518c\u548c\u6700\u7ec8\u62a5\u544a\u7684\u72ec\u7acb\u7f51\u7ad9\u6b63\u5728\u51c6\u5907\u4e2d\u3002"
      }
    }
  }
} """)


def write_locale_files() -> None:
    locale_dir = ROOT / "locales"
    locale_dir.mkdir(exist_ok=True)

    for language, payload in LOCALE_DATA.items():
        target = locale_dir / f"{language}.json"
        target.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
            newline="\n",
        )


def fix_app_js() -> None:
    app_path = ROOT / "app.js"
    if not app_path.exists():
        return

    content = app_path.read_text(encoding="utf-8")
    content = content.replace(
        "document.title = `${service.title} ??Whale Land`;",
        "document.title = `${service.title} \u2014 Whale Land`;",
    )
    content = content.replace(
        '<span class="world-link" aria-hidden="true">??/span>',
        '<span class="world-link" aria-hidden="true">\u2197</span>',
    )
    app_path.write_text(content, encoding="utf-8", newline="\n")


def remove_old_powershell_generator() -> None:
    old_script = ROOT / "tools" / "apply-whaleland-chapter-hub.ps1"
    if old_script.exists():
        old_script.unlink()


def main() -> None:
    write_locale_files()
    fix_app_js()
    remove_old_powershell_generator()
    print("Whale Land locale JSON files and app.js were repaired.")
    print("Next: validate JSON files, then git add/commit/push.")


if __name__ == "__main__":
    main()
