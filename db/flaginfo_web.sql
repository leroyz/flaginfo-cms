/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : flaginfo_web

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-08-03 09:30:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `number` varchar(10) NOT NULL,
  `create_date` date NOT NULL,
  `status` int(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '状态，0表示未借出，1表示已借出',
  `user_id` varchar(255) DEFAULT NULL COMMENT '借书人id',
  `begin_date` date DEFAULT NULL COMMENT '开始时间',
  `end_date` date DEFAULT NULL COMMENT '结束时间',
  `return_date` date DEFAULT NULL COMMENT '归还时间',
  UNIQUE ('number'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------

-- ----------------------------
-- Table structure for book_bill
-- ----------------------------
DROP TABLE IF EXISTS `book_bill`;
CREATE TABLE `book_bill` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `book_id` varchar(255) NOT NULL,
  `book_name` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `status` int(10) unsigned zerofill NOT NULL COMMENT '状态',
  `borrow_date` datetime NOT NULL COMMENT '借书时间',
  `return_date` datetime DEFAULT NULL COMMENT '归还时间',
  PRIMARY KEY (`id`),
  KEY `book_bill_ibfk_1` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_bill
-- ----------------------------

-- ----------------------------
-- Table structure for leave
-- ----------------------------
DROP TABLE IF EXISTS `leave`;
CREATE TABLE `leave` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  `leave_time` float NOT NULL DEFAULT '0' COMMENT '总共请假时间',
  `total_time` float NOT NULL DEFAULT '0' COMMENT '总共调休时间',
  `surplus_time` float NOT NULL DEFAULT '0' COMMENT '剩余调休时间',
  `month_time` float NOT NULL DEFAULT '0' COMMENT '本月请假时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leave
-- ----------------------------

-- ----------------------------
-- Table structure for leave_bill
-- ----------------------------
DROP TABLE IF EXISTS `leave_bill`;
CREATE TABLE `leave_bill` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  `begin_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '结束时间',
  `content` varchar(255) NOT NULL DEFAULT '0' COMMENT '请假原因',
  `time` float NOT NULL DEFAULT '0' COMMENT '请假时长',
  `type` int(1) NOT NULL COMMENT '请假类型',
  PRIMARY KEY (`id`),
  KEY `user_id_fk` (`user_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of leave_bill
-- ----------------------------

-- ----------------------------
-- Table structure for overtime
-- ----------------------------
DROP TABLE IF EXISTS `overtime`;
CREATE TABLE `overtime` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `total_time` float DEFAULT '0' COMMENT '总共加班时间',
  `month_time` float DEFAULT '0' COMMENT '本月加班时间',
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id_fk_overtime` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of overtime
-- ----------------------------

-- ----------------------------
-- Table structure for overtime_bill
-- ----------------------------
DROP TABLE IF EXISTS `overtime_bill`;
CREATE TABLE `overtime_bill` (
  `id` varchar(255) NOT NULL,
  `begin_date` datetime NOT NULL COMMENT '开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '结束时间',
  `reason` varchar(255) NOT NULL COMMENT '请假原因',
  `time` float NOT NULL DEFAULT '0' COMMENT '请假时长',
  `user_id` varchar(255) NOT NULL COMMENT '外键，关联userid',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of overtime_bill
-- ----------------------------

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `number` varchar(255) NOT NULL,
  `name` varchar(30) NOT NULL COMMENT '名字',
  `password` varchar(16) NOT NULL,
  `mobile` varchar(11) NOT NULL COMMENT '移动电话',
  `tel` varchar(15) DEFAULT NULL COMMENT '座机',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `join_date` date NOT NULL,
  `create_date` date NOT NULL COMMENT '创建时间',
  `update_date` date DEFAULT NULL COMMENT '更新时间',
  `delete_date` date DEFAULT NULL COMMENT '删除时间',
  `role` int(1) NOT NULL COMMENT '角色，0表示超管，1表示普通管理员，2表示普通员工',
  `gender` int(1) NOT NULL COMMENT '性别，0表示男，1表示女',
  `position` varchar(50) DEFAULT NULL COMMENT '职位',
  `desc` varchar(500) DEFAULT NULL COMMENT '备注，描述',
  UNIQUE ('number'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0', '000', 'admin', 'admin123', '18282828282', '02823659', 'admin@flaginfo.com.cn', '2017-07-12', '2017-08-02', null, null, '0', '0', '超级管理员', '超级管理员拥有所有操作权限');
