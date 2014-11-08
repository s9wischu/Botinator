#!/usr/bin/env python


import rospy
from geometry_msgs.msg import Twist
from kobuki_msgs.msg import BumperEvent
from random import randint
from sensor_msgs.msg import PointCloud2
import sensor_msgs.point_cloud2 as pc2

# states: HIT1, ROTATING, DEFAULT

def sender():
	pub = rospy.publisher("/camera/depth_registered/points", PointCloud2);
	rospy.init_node('sender', anonymous=True)
	r = rospz.Rate(10)

	while not rospy.is_shutdown():
		rospy.loginfo("Sender -----")
		pub.publish(pc2)
		r.sleep()

        
if __name__ == '__main__':
	try:
		sender()
	except rospy.ROSInterruptException:
		pass

